import { hashWallet } from "@/lib/hash";
import type { WalletSnapshot } from "@/lib/types";

/**
 * Real wallet analytics via Helius.
 *
 * Two Helius surfaces are used:
 *   1. Standard JSON-RPC `getSignaturesForAddress` for tx count + wallet age.
 *   2. Enhanced Transactions REST API for parsed protocol / swap data.
 *
 * The Enhanced API is the slower / more expensive path so we cap it at a
 * small page. The signature pagination caps at ~5000 to stay snappy on the
 * Vercel free tier (10s function timeout). For very active wallets this means
 * txCount is reported as "5000+" by treating that as a hard cap.
 *
 * Required env var: HELIUS_API_KEY (server-only, never NEXT_PUBLIC_*).
 */

const SIG_PAGE = 1000;
const SIG_MAX_PAGES = 5; // 5 × 1000 = 5000 sig cap
const ENHANCED_LIMIT = 100;

type SignatureInfo = {
  signature: string;
  blockTime: number | null;
  slot: number;
  err: unknown;
};

type EnhancedTx = {
  type?: string;
  source?: string;
  timestamp?: number;
};

function heliusRpcUrl() {
  const key = process.env.HELIUS_API_KEY;
  if (!key) throw new Error("HELIUS_API_KEY not set");
  return `https://mainnet.helius-rpc.com/?api-key=${key}`;
}

function heliusRestUrl(path: string) {
  const key = process.env.HELIUS_API_KEY;
  if (!key) throw new Error("HELIUS_API_KEY not set");
  const sep = path.includes("?") ? "&" : "?";
  return `https://api.helius.xyz/v0${path}${sep}api-key=${key}`;
}

async function rpcCall<T>(method: string, params: unknown[]): Promise<T> {
  const res = await fetch(heliusRpcUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Helius RPC ${method} HTTP ${res.status}`);
  const data = (await res.json()) as { result?: T; error?: { message: string } };
  if (data.error) throw new Error(`Helius RPC ${method}: ${data.error.message}`);
  return data.result as T;
}

async function getAllSignatures(address: string): Promise<SignatureInfo[]> {
  const all: SignatureInfo[] = [];
  let before: string | undefined;
  for (let page = 0; page < SIG_MAX_PAGES; page++) {
    const params: [string, { limit: number; before?: string }] = [
      address,
      { limit: SIG_PAGE, ...(before ? { before } : {}) },
    ];
    const batch = await rpcCall<SignatureInfo[]>("getSignaturesForAddress", params);
    all.push(...batch);
    if (batch.length < SIG_PAGE) break;
    before = batch[batch.length - 1].signature;
  }
  return all;
}

async function getEnhancedTransactions(address: string): Promise<EnhancedTx[]> {
  const res = await fetch(
    heliusRestUrl(`/addresses/${address}/transactions?limit=${ENHANCED_LIMIT}`),
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  const data = (await res.json()) as EnhancedTx[];
  return Array.isArray(data) ? data : [];
}

function bucketVolumeFromSwapCount(swapCount: number): WalletSnapshot["lifetimeVolumeRange"] {
  // Rough heuristic. Real lifetime USD volume needs price-at-trade lookups
  // (Jupiter or Birdeye) and wash-trade filtering. For the MVP, swap count is
  // a good-enough signal for tier bucketing.
  if (swapCount >= 80) return "$50K+";
  if (swapCount >= 40) return "$10K-$50K";
  if (swapCount >= 15) return "$1K-$10K";
  if (swapCount >= 3) return "$100-$1K";
  return "$0-$100";
}

export async function getHeliusWalletSnapshot(walletAddress: string): Promise<WalletSnapshot> {
  const [sigsResult, txsResult] = await Promise.allSettled([
    getAllSignatures(walletAddress),
    getEnhancedTransactions(walletAddress),
  ]);

  const sigs = sigsResult.status === "fulfilled" ? sigsResult.value : [];
  const txs = txsResult.status === "fulfilled" ? txsResult.value : [];

  const txCount = sigs.length;
  const oldestBlockTime = sigs
    .map((s) => s.blockTime)
    .filter((t): t is number => typeof t === "number")
    .reduce<number | null>((min, t) => (min === null || t < min ? t : min), null);
  const walletAgeDays = oldestBlockTime
    ? Math.max(0, Math.floor((Date.now() / 1000 - oldestBlockTime) / 86400))
    : 0;

  const swapTxs = txs.filter((t) => t.type === "SWAP");
  const swapCount = swapTxs.length;
  const nftCount = txs.filter((t) => t.type === "NFT_SALE" || t.type === "NFT_MINT").length;

  const protocolsUsed = Array.from(
    new Set(
      txs
        .map((t) => t.source)
        .filter((s): s is string => typeof s === "string" && s.length > 0)
    )
  );

  return {
    walletHash: hashWallet(walletAddress),
    walletAgeDays,
    txCount,
    swapCount,
    nftCount,
    lifetimeVolumeRange: bucketVolumeFromSwapCount(swapCount),
    protocolsUsed: protocolsUsed.length ? protocolsUsed : ["Unknown"],
    // Risk signals require a separate provider (Range, TRM). Empty for now.
    riskFlags: [],
    createdAt: new Date().toISOString(),
    dataSource: "helius",
  };
}
