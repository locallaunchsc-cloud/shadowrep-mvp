import {
  Award,
  BarChart3,
  CheckCircle2,
  Compass,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { ReputationResult } from "@/lib/scoring";

const BADGE_ICON: Record<string, typeof Award> = {
  "Aged Wallet": Award,
  "Active Wallet": TrendingUp,
  "Active Trader": TrendingUp,
  "Volume Verified": BarChart3,
  "Protocol Explorer": Compass,
  "Clean Signals": ShieldCheck,
};

export function ReputationCard({
  result,
  proofId,
}: {
  result: ReputationResult;
  proofId?: string;
}) {
  const live = result.snapshot.dataSource === "helius";

  return (
    <div className="conic-border tilt rounded-3xl p-8 shadow-card">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">
              // SHADOWREP::VERIFIED
            </p>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold ${
                live
                  ? "border-acid/40 bg-acid/10 text-acid"
                  : "border-magenta/40 bg-magenta/10 text-magenta"
              }`}
            >
              <span className="relative flex h-1.5 w-1.5">
                {live && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
                )}
                <span
                  className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                    live ? "bg-acid" : "bg-magenta"
                  }`}
                />
              </span>
              {live ? "LIVE · HELIUS" : "DEMO · MOCK"}
            </span>
          </div>
          <h2 className="mt-3 font-display text-5xl font-black tracking-tight">
            <span className="holo-text">{result.tier.toUpperCase()}</span>
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Wallet hidden. Reputation visible.
          </p>
        </div>
        <div className="rounded-2xl border border-acid/30 bg-acid/5 px-4 py-3 text-center">
          <p className="font-mono text-[10px] uppercase tracking-wider text-acid">
            SCORE
          </p>
          <p className="font-display text-3xl font-black">{result.score}</p>
          <p className="font-mono text-[10px] text-acid/60">/100</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-7 grid gap-2 sm:grid-cols-2">
        {result.badges.map((badge, i) => {
          const Icon = BADGE_ICON[badge.name] ?? Sparkles;
          const accent =
            i % 4 === 0
              ? "text-acid"
              : i % 4 === 1
              ? "text-cyber"
              : i % 4 === 2
              ? "text-iris"
              : "text-magenta";
          return (
            <div
              key={badge.name}
              className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-white/[0.12]"
            >
              <span className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-white/5 ${accent}`}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold leading-tight">{badge.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {badge.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-2 rounded-2xl border border-white/[0.06] bg-black/40 p-4 font-mono text-xs sm:grid-cols-2">
        {[
          ["wallet_age", `${result.snapshot.walletAgeDays}d`],
          ["transactions", result.snapshot.txCount.toLocaleString()],
          ["volume_tier", result.snapshot.lifetimeVolumeRange],
          [
            "risk_signals",
            result.snapshot.riskFlags.length
              ? result.snapshot.riskFlags.join(", ")
              : "clean",
          ],
          [
            "protocols",
            result.snapshot.protocolsUsed.slice(0, 4).join(" · ") || "—",
          ],
          ["swaps_recent", result.snapshot.swapCount.toLocaleString()],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <span className="text-slate-500">{label}</span>
            <span className="truncate text-slate-200">{value}</span>
          </div>
        ))}
      </div>

      {/* Identifiers */}
      <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-slate-500">
        <p>
          wallet&nbsp;: <span className="text-slate-700">●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●</span>
        </p>
        <p className="break-all">
          hash&nbsp;&nbsp;&nbsp;: <span className="text-cyber">{result.snapshot.walletHash.slice(0, 24)}…</span>
        </p>
        {proofId && (
          <p className="break-all">
            proof&nbsp;&nbsp;: <span className="text-acid">{proofId}</span>
          </p>
        )}
      </div>
    </div>
  );
}
