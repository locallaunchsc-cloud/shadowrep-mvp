export type WalletSnapshot = {
  walletHash: string;
  walletAgeDays: number;
  txCount: number;
  swapCount: number;
  nftCount: number;
  lifetimeVolumeRange: "$0-$100" | "$100-$1K" | "$1K-$10K" | "$10K-$50K" | "$50K+";
  protocolsUsed: string[];
  riskFlags: string[];
  createdAt: string;
  /** "helius" = real on-chain reads. "mock" = deterministic demo data. */
  dataSource: "helius" | "mock";
};

export type GateRequirement = {
  minWalletAgeDays?: number;
  minTxCount?: number;
  minSwapCount?: number;
  minVolumeTier?: WalletSnapshot["lifetimeVolumeRange"];
  requireCleanSignals?: boolean;
  requiredProtocols?: string[];
};
