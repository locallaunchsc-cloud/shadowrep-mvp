import { hashWallet } from "@/lib/hash";
import type { WalletSnapshot } from "@/lib/types";

const protocols = ["Jupiter", "Pump.fun", "Raydium", "Drift", "Tensor", "Magic Eden", "Kamino", "Jito"];
const volumeTiers: WalletSnapshot["lifetimeVolumeRange"][] = ["$0-$100", "$100-$1K", "$1K-$10K", "$10K-$50K", "$50K+"];

function pseudoRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

export async function getMockWalletSnapshot(walletAddress: string): Promise<WalletSnapshot> {
  const n = pseudoRandom(walletAddress);
  const walletAgeDays = 12 + (n % 920);
  const txCount = 8 + (n % 2400);
  const swapCount = n % 420;
  const nftCount = n % 80;
  const lifetimeVolumeRange = volumeTiers[Math.min(4, Math.floor((n % 100) / 20))];
  const protocolsUsed = protocols.filter((_, index) => ((n >> index) & 1) === 1).slice(0, 5);
  const riskFlags = n % 13 === 0 ? ["fresh-wallet-pattern"] : n % 29 === 0 ? ["high-risk-counterparty-touch"] : [];

  return {
    walletHash: hashWallet(walletAddress),
    walletAgeDays,
    txCount,
    swapCount,
    nftCount,
    lifetimeVolumeRange,
    protocolsUsed: protocolsUsed.length ? protocolsUsed : ["Jupiter"],
    riskFlags,
    createdAt: new Date().toISOString(),
  };
}
