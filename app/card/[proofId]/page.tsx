"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Award,
  BarChart3,
  CheckCircle2,
  Compass,
  Loader2,
  Lock,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { ProofPayload } from "@/lib/proofs";

type State =
  | { status: "loading" }
  | { status: "found"; proof: ProofPayload }
  | { status: "missing" };

const BADGE_ICON: Record<string, typeof Award> = {
  "Aged Wallet": Award,
  "Active Wallet": TrendingUp,
  "Active Trader": TrendingUp,
  "Volume Verified": BarChart3,
  "Protocol Explorer": Compass,
  "Clean Signals": ShieldCheck,
};

export default function ProofCardPage() {
  const params = useParams<{ proofId: string }>();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/proofs/${params.proofId}`);
        if (!res.ok) {
          if (!cancelled) setState({ status: "missing" });
          return;
        }
        const data = await res.json();
        if (!cancelled) setState({ status: "found", proof: data.proof });
      } catch {
        if (!cancelled) setState({ status: "missing" });
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [params.proofId]);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden">
        <div className="blob-field">
          <div className="blob blob-acid animate-blob-1 absolute left-[-15%] top-0 h-[440px] w-[440px] opacity-30" />
          <div className="blob blob-cyber animate-blob-3 absolute right-[-10%] top-32 h-[480px] w-[480px] opacity-30" />
          <div className="blob blob-iris animate-blob-2 absolute left-1/3 top-40 h-[360px] w-[360px] opacity-25" />
        </div>

        <section className="relative mx-auto max-w-3xl px-6 py-14">
          {state.status === "loading" && (
            <div className="glass rounded-3xl p-12 text-center">
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-acid" />
              <p className="mt-4 font-mono text-sm uppercase tracking-wider text-slate-400">
                LOADING_PROOF…
              </p>
            </div>
          )}

          {state.status === "missing" && (
            <div className="glass rounded-3xl p-10">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-magenta">
                // SHADOWREP::PUBLIC_CARD
              </p>
              <h1 className="mt-4 font-display text-4xl font-black tracking-tight">
                Proof not available
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                In the demo MVP, proofs live in serverless memory and reset
                between deploys or cold starts. Connect persistent storage
                (Prisma + Postgres) to make share cards permanent.
              </p>
              <p className="mt-6 break-all rounded-2xl bg-black/40 p-4 font-mono text-xs text-slate-500">
                proof_id: {params.proofId}
              </p>
            </div>
          )}

          {state.status === "found" && (
            <div className="animate-fade-in-up">
              <div className="conic-border tilt rounded-3xl p-8 shadow-card">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">
                        // SHADOWREP::PUBLIC_CARD
                      </p>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-acid/40 bg-acid/10 px-2 py-0.5 font-mono text-[10px] font-bold text-acid">
                        <span className="h-1.5 w-1.5 rounded-full bg-acid" />
                        SIGNED
                      </span>
                    </div>
                    <h1 className="mt-3 font-display text-5xl font-black tracking-tight">
                      <span className="holo-text">
                        {state.proof.tier.toUpperCase()}
                      </span>
                    </h1>
                    <p className="mt-2 text-sm text-slate-400">
                      Wallet hidden. Reputation visible.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-acid/30 bg-acid/5 px-4 py-3 text-center">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-acid">
                      SCORE
                    </p>
                    <p className="font-display text-3xl font-black">
                      {state.proof.score}
                    </p>
                    <p className="font-mono text-[10px] text-acid/60">/100</p>
                  </div>
                </div>

                {/* Badges */}
                <div className="mt-7 grid gap-2 sm:grid-cols-2">
                  {state.proof.badges.map((badge, i) => {
                    const Icon = BADGE_ICON[badge] ?? Sparkles;
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
                        key={badge}
                        className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                      >
                        <span className={`grid h-9 w-9 place-items-center rounded-xl bg-white/5 ${accent}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <p className="text-sm font-bold">{badge}</p>
                        <CheckCircle2 className="ml-auto h-4 w-4 text-acid" />
                      </div>
                    );
                  })}
                </div>

                {/* Meta */}
                <div className="mt-6 grid gap-2 rounded-2xl border border-white/[0.06] bg-black/40 p-4 font-mono text-xs sm:grid-cols-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-500">issued</span>
                    <span className="text-slate-200">
                      {new Date(state.proof.issuedAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-500">expires</span>
                    <span className="text-slate-200">
                      {new Date(state.proof.expiresAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Identifiers */}
                <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-slate-500">
                  <p>
                    wallet : <span className="text-slate-700">●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●</span>
                  </p>
                  <p className="break-all">
                    hash&nbsp;&nbsp; : <span className="text-cyber">{state.proof.walletHash.slice(0, 32)}…</span>
                  </p>
                  <p className="break-all">
                    proof&nbsp; : <span className="text-acid">{state.proof.proofId}</span>
                  </p>
                  <p className="break-all">
                    sig&nbsp;&nbsp;&nbsp; : <span className="text-iris">{state.proof.signature.slice(0, 32)}…</span>
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                  <Lock className="h-3.5 w-3.5 text-acid" />
                  wallet_never_disclosed · verifier_sees_proof_only
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
