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
    <div className="chrome-border tilt rounded-3xl p-8 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-400">
              // SHADOWREP::VERIFIED
            </p>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold ${
                live
                  ? "border-iris/40 bg-iris/10 text-iris"
                  : "border-white/15 bg-white/[0.04] text-zinc-400"
              }`}
            >
              <span className="relative flex h-1.5 w-1.5">
                {live && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-iris opacity-75" />
                )}
                <span
                  className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                    live ? "bg-iris" : "bg-zinc-500"
                  }`}
                />
              </span>
              {live ? "LIVE · HELIUS" : "DEMO · MOCK"}
            </span>
          </div>
          <h2 className="mt-3 font-display text-5xl font-black tracking-tight">
            <span className="chrome-text">{result.tier.toUpperCase()}</span>
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Wallet hidden. Reputation visible.
          </p>
        </div>
        <div className="chrome-surface rounded-2xl border border-white/15 px-4 py-3 text-center">
          <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            SCORE
          </p>
          <p className="font-display text-3xl font-black text-white">
            {result.score}
          </p>
          <p className="font-mono text-[10px] text-zinc-500">/100</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-7 grid gap-2 sm:grid-cols-2">
        {result.badges.map((badge) => {
          const Icon = BADGE_ICON[badge.name] ?? Sparkles;
          return (
            <div
              key={badge.name}
              className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-white/[0.14]"
            >
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-white">
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold leading-tight">{badge.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">
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
            <span className="text-zinc-500">{label}</span>
            <span className="truncate text-zinc-200">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-zinc-500">
        <p>
          wallet&nbsp;: <span className="text-zinc-700">●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●</span>
        </p>
        <p className="break-all">
          hash&nbsp;&nbsp;&nbsp;: <span className="text-zinc-300">{result.snapshot.walletHash.slice(0, 24)}…</span>
        </p>
        {proofId && (
          <p className="break-all">
            proof&nbsp;&nbsp;: <span className="text-iris">{proofId}</span>
          </p>
        )}
      </div>
    </div>
  );
}
