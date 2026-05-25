import type { ReputationResult } from "@/lib/scoring";

export function ReputationCard({ result, proofId }: { result: ReputationResult; proofId?: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-glow backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-purple-200">ShadowRep Verified</p>
          <h2 className="mt-2 text-4xl font-black">{result.tier}</h2>
          <p className="mt-2 text-sm text-slate-300">Wallet hidden. Reputation visible.</p>
        </div>
        <div className="rounded-2xl bg-purple-500/20 px-4 py-3 text-center">
          <p className="text-xs text-purple-100">Score</p>
          <p className="text-3xl font-black">{result.score}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {result.badges.map((badge) => (
          <div key={badge.name} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="font-bold">{badge.name}</p>
            <p className="mt-1 text-sm text-slate-400">{badge.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
        <p>Wallet age: <span className="text-white">{result.snapshot.walletAgeDays} days</span></p>
        <p>Transactions: <span className="text-white">{result.snapshot.txCount}</span></p>
        <p>Volume tier: <span className="text-white">{result.snapshot.lifetimeVolumeRange}</span></p>
        <p>Risk signals: <span className="text-white">{result.snapshot.riskFlags.length ? result.snapshot.riskFlags.join(", ") : "Clean"}</span></p>
      </div>

      {proofId && <p className="mt-5 break-all rounded-xl bg-black/30 p-3 text-xs text-slate-400">Proof ID: {proofId}</p>}
    </div>
  );
}
