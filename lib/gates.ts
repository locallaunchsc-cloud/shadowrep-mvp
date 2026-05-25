import type { GateRequirement, WalletSnapshot } from "@/lib/types";

const tierRank: Record<WalletSnapshot["lifetimeVolumeRange"], number> = {
  "$0-$100": 0,
  "$100-$1K": 1,
  "$1K-$10K": 2,
  "$10K-$50K": 3,
  "$50K+": 4,
};

export function evaluateGate(snapshot: WalletSnapshot, requirements: GateRequirement) {
  const checks = [
    {
      label: "Wallet age",
      passed: requirements.minWalletAgeDays ? snapshot.walletAgeDays >= requirements.minWalletAgeDays : true,
    },
    {
      label: "Transaction count",
      passed: requirements.minTxCount ? snapshot.txCount >= requirements.minTxCount : true,
    },
    {
      label: "Swap count",
      passed: requirements.minSwapCount ? snapshot.swapCount >= requirements.minSwapCount : true,
    },
    {
      label: "Volume tier",
      passed: requirements.minVolumeTier ? tierRank[snapshot.lifetimeVolumeRange] >= tierRank[requirements.minVolumeTier] : true,
    },
    {
      label: "Clean signals",
      passed: requirements.requireCleanSignals ? snapshot.riskFlags.length === 0 : true,
    },
    {
      label: "Required protocols",
      passed: requirements.requiredProtocols?.length ? requirements.requiredProtocols.every((p) => snapshot.protocolsUsed.includes(p)) : true,
    },
  ];

  return { qualified: checks.every((c) => c.passed), checks };
}
