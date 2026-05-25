import type { WalletSnapshot } from "@/lib/types";
import { getMockWalletSnapshot } from "@/lib/walletAnalytics.mock";
import { getHeliusWalletSnapshot } from "@/lib/walletAnalytics.helius";

/**
 * Returns a wallet snapshot. Uses Helius when HELIUS_API_KEY is set, otherwise
 * falls back to deterministic mock data so the demo deploy works out of the
 * box. If Helius fails at runtime (rate limit, network error), we degrade
 * gracefully to the mock instead of failing the request.
 */
export async function getWalletSnapshot(walletAddress: string): Promise<WalletSnapshot> {
  if (process.env.HELIUS_API_KEY) {
    try {
      return await getHeliusWalletSnapshot(walletAddress);
    } catch (err) {
      console.error("[walletAnalytics] Helius failed, falling back to mock:", err);
    }
  }
  return getMockWalletSnapshot(walletAddress);
}

// Backwards-compat alias for existing callers. New code should import
// getWalletSnapshot directly.
export { getMockWalletSnapshot };
