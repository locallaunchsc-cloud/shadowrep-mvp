import type { WalletSnapshot } from "@/lib/types";

export type Badge = { name: string; description: string; weight: number };
export type ReputationResult = {
  score: number;
  tier: "Unranked" | "Bronze" | "Silver" | "Gold" | "Shadow Elite";
  badges: Badge[];
  snapshot: WalletSnapshot;
};

const volumePoints: Record<WalletSnapshot["lifetimeVolumeRange"], number> = {
  "$0-$100": 0,
  "$100-$1K": 5,
  "$1K-$10K": 10,
  "$10K-$50K": 15,
  "$50K+": 20,
};

export function scoreWallet(snapshot: WalletSnapshot): ReputationResult {
  let score = 0;
  const badges: Badge[] = [];

  const agePoints = snapshot.walletAgeDays >= 365 ? 20 : snapshot.walletAgeDays >= 180 ? 15 : snapshot.walletAgeDays >= 90 ? 10 : snapshot.walletAgeDays >= 30 ? 5 : 0;
  score += agePoints;
  if (agePoints >= 10) badges.push({ name: "Aged Wallet", description: `${snapshot.walletAgeDays}+ days of on-chain history.`, weight: agePoints });

  const txPoints = snapshot.txCount >= 1000 ? 15 : snapshot.txCount >= 250 ? 12 : snapshot.txCount >= 100 ? 8 : snapshot.txCount >= 25 ? 4 : 0;
  score += txPoints;
  if (txPoints >= 8) badges.push({ name: "Active Wallet", description: "Meaningful transaction history detected.", weight: txPoints });

  const volume = volumePoints[snapshot.lifetimeVolumeRange];
  score += volume;
  if (volume >= 10) badges.push({ name: "Volume Verified", description: `Trading activity in the ${snapshot.lifetimeVolumeRange} range.`, weight: volume });

  const protocolPoints = Math.min(15, snapshot.protocolsUsed.length * 3);
  score += protocolPoints;
  if (protocolPoints >= 9) badges.push({ name: "Protocol Explorer", description: `Used ${snapshot.protocolsUsed.length}+ Solana protocols.`, weight: protocolPoints });

  const cleanPoints = snapshot.riskFlags.length === 0 ? 20 : Math.max(0, 10 - snapshot.riskFlags.length * 5);
  score += cleanPoints;
  if (snapshot.riskFlags.length === 0) badges.push({ name: "Clean Signals", description: "No major risk flags in the current scan.", weight: cleanPoints });

  if (snapshot.swapCount >= 50) {
    score += 10;
    badges.push({ name: "Active Trader", description: "Swap activity indicates real trading behavior.", weight: 10 });
  }

  score = Math.max(0, Math.min(100, score));
  const tier = score >= 85 ? "Shadow Elite" : score >= 70 ? "Gold" : score >= 50 ? "Silver" : score >= 25 ? "Bronze" : "Unranked";
  return { score, tier, badges, snapshot };
}
