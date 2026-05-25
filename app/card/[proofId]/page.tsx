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
      <main className="relative min-h-screen">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(99,102,241,0.18)_0%,transparent_45%)]" />
        <section className="relative mx-auto max-w-3xl px-6 py-14">
          {state.status === "loading" && (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-purple-300" />
              <p className="mt-4 text-sm text-slate-400">Loading proof…</p>
            </div>
          )}

          {state.status === "missing" && (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-300">
                ShadowRep Public Card
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight">
                Proof not available
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                In the demo MVP, proofs live in serverless memory and reset
                between deploys or cold starts. Connect persistent storage
                (Prisma + Postgres) to make share cards permanent.
              </p>
              <p className="mt-6 break-all rounded-2xl bg-black/30 p-4 font-mono text-xs text-slate-500">
                Proof ID: {params.proofId}
              </p>
            </div>
          )}

          {state.status === "found" && (
            <div className="animate-fade-in-up">
              <div className="relative rounded-3xl bg-gradient-to-br from-white/[0.12] to-white/[0.02] p-px shadow-card">
                <div className="rounded-[1.45rem] bg-[#0a0a14]/90 p-8 backdrop-blur">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-purple-300">
                          ShadowRep Public Card
                        </p>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                          Signed proof
                        </span>
                      </div>
                      <h1 className="mt-3 bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-5xl font-black tracking-tight text-transparent">
                        {state.proof.tier}
                      </h1>
                      <p className="mt-2 text-sm text-slate-400">
                        Wallet hidden. Reputation visible.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-purple-400/20 bg-purple-500/15 px-4 py-3 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-200">
                        Score
                      </p>
                      <p className="text-3xl font-black">{state.proof.score}</p>
                      <p className="text-[10px] text-purple-300/70">of 100</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="mt-7 grid gap-2 sm:grid-cols-2">
                    {state.proof.badges.map((badge) => {
                      const Icon = BADGE_ICON[badge] ?? Sparkles;
                      return (
                        <div
                          key={badge}
                          className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                        >
                          <span className="grid h-9 w-9 place-items-center rounded-xl bg-purple-500/15 text-purple-300">
                            <Icon className="h-4 w-4" />
                          </span>
                          <p className="text-sm font-bold">{badge}</p>
                          <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-400" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Meta */}
                  <div className="mt-6 grid gap-2 rounded-2xl border border-white/[0.06] bg-black/30 p-4 text-xs sm:grid-cols-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Issued</span>
                      <span className="text-slate-200">
                        {new Date(state.proof.issuedAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Expires</span>
                      <span className="text-slate-200">
                        {new Date(state.proof.expiresAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Identifiers */}
                  <div className="mt-4 rounded-xl bg-black/30 p-3 font-mono text-[11px] leading-relaxed text-slate-500">
                    <p>
                      wallet: <span className="text-slate-600">●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●</span>
                    </p>
                    <p className="break-all">
                      hash&nbsp;&nbsp;: <span className="text-slate-400">{state.proof.walletHash.slice(0, 32)}…</span>
                    </p>
                    <p className="break-all">
                      proof&nbsp;: <span className="text-slate-400">{state.proof.proofId}</span>
                    </p>
                    <p className="break-all">
                      sig&nbsp;&nbsp;&nbsp;: <span className="text-slate-400">{state.proof.signature.slice(0, 32)}…</span>
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-500">
                    <Lock className="h-3.5 w-3.5" />
                    Wallet address never disclosed. Verifier sees signed proof,
                    not the public key.
                  </div>
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
