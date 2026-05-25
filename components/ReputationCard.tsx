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
  const tierColor =
    result.tier === "Shadow Elite"
      ? "from-fuchsia-400 to-purple-500"
      : result.tier === "Gold"
      ? "from-amber-300 to-orange-400"
      : result.tier === "Silver"
      ? "from-slate-200 to-slate-400"
      : result.tier === "Bronze"
      ? "from-orange-300 to-amber-600"
      : "from-slate-500 to-slate-700";

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-white/[0.12] to-white/[0.02] p-px shadow-card">
      <div className="rounded-[1.45rem] bg-[#0a0a14]/90 p-7 backdrop-blur">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-purple-300">
                ShadowRep Verified
              </p>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                  live
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                    : "border-amber-400/30 bg-amber-400/10 text-amber-200"
                }`}
              >
                <span
                  className={`relative flex h-1.5 w-1.5`}
                >
                  {live && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                      live ? "bg-emerald-300" : "bg-amber-300"
                    }`}
                  />
                </span>
                {live ? "Live · Helius" : "Demo · Mock"}
              </span>
            </div>
            <h2
              className={`mt-3 bg-gradient-to-r ${tierColor} bg-clip-text text-4xl font-black tracking-tight text-transparent`}
            >
              {result.tier}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Wallet hidden. Reputation visible.
            </p>
          </div>
          <div className="rounded-2xl border border-purple-400/20 bg-purple-500/15 px-4 py-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-200">
              Score
            </p>
            <p className="text-3xl font-black">{result.score}</p>
            <p className="text-[10px] text-purple-300/70">of 100</p>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-7 grid gap-2 sm:grid-cols-2">
          {result.badges.map((badge) => {
            const Icon = BADGE_ICON[badge.name] ?? Sparkles;
            return (
              <div
                key={badge.name}
                className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-purple-500/15 text-purple-300">
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
        <div className="mt-6 grid gap-2 rounded-2xl border border-white/[0.06] bg-black/30 p-4 text-xs sm:grid-cols-2">
          {[
            ["Wallet age", `${result.snapshot.walletAgeDays} days`],
            ["Transactions", result.snapshot.txCount.toLocaleString()],
            ["Volume tier", result.snapshot.lifetimeVolumeRange],
            [
              "Risk signals",
              result.snapshot.riskFlags.length
                ? result.snapshot.riskFlags.join(", ")
                : "Clean",
            ],
            [
              "Protocols",
              result.snapshot.protocolsUsed.slice(0, 4).join(" · ") || "—",
            ],
            ["Swaps (recent)", result.snapshot.swapCount.toLocaleString()],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-slate-500">{label}</span>
              <span className="font-medium text-slate-200">{value}</span>
            </div>
          ))}
        </div>

        {/* Wallet hash */}
        <div className="mt-4 rounded-xl bg-black/30 p-3 font-mono text-[11px] leading-relaxed text-slate-500">
          <p>
            wallet&nbsp;: <span className="text-slate-600">●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●</span>
          </p>
          <p className="break-all">
            hash&nbsp;&nbsp;&nbsp;: <span className="text-slate-400">{result.snapshot.walletHash.slice(0, 24)}…</span>
          </p>
          {proofId && (
            <p className="break-all">
              proof&nbsp;&nbsp;: <span className="text-slate-400">{proofId}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
