"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import type { ProofPayload } from "@/lib/proofs";

type State =
  | { status: "loading" }
  | { status: "found"; proof: ProofPayload }
  | { status: "missing" };

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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1f3b5f_0,#080812_44%)]">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-glow">
          <p className="text-xs uppercase tracking-[0.35em] text-purple-200">
            ShadowRep Public Card
          </p>

          {state.status === "loading" && (
            <>
              <h1 className="mt-4 text-4xl font-black">Loading proof…</h1>
              <p className="mt-3 text-slate-400">Fetching reputation card.</p>
            </>
          )}

          {state.status === "missing" && (
            <>
              <h1 className="mt-4 text-4xl font-black">Wallet Hidden</h1>
              <p className="mt-3 text-slate-300">
                This proof could not be loaded. In the demo MVP, proofs live in
                serverless memory and reset between deploys or cold starts.
                Connect persistent storage (Prisma / Postgres) to keep cards
                shareable long-term.
              </p>
              <p className="mt-6 break-all rounded-2xl bg-black/30 p-4 text-sm text-slate-300">
                Proof ID: {params.proofId}
              </p>
            </>
          )}

          {state.status === "found" && (
            <>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-black">{state.proof.tier}</h1>
                  <p className="mt-2 text-sm text-slate-300">
                    Wallet hidden. Reputation visible.
                  </p>
                </div>
                <div className="rounded-2xl bg-purple-500/20 px-4 py-3 text-center">
                  <p className="text-xs text-purple-100">Score</p>
                  <p className="text-3xl font-black">{state.proof.score}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {state.proof.badges.map((badge) => (
                  <div
                    key={badge}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold"
                  >
                    {badge}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-2 text-sm text-slate-300">
                <p>
                  Issued:{" "}
                  <span className="text-white">
                    {new Date(state.proof.issuedAt).toLocaleString()}
                  </span>
                </p>
                <p>
                  Expires:{" "}
                  <span className="text-white">
                    {new Date(state.proof.expiresAt).toLocaleString()}
                  </span>
                </p>
              </div>

              <p className="mt-6 break-all rounded-xl bg-black/30 p-3 text-xs text-slate-400">
                Proof ID: {state.proof.proofId}
              </p>
              <p className="mt-2 break-all rounded-xl bg-black/30 p-3 text-xs text-slate-500">
                Wallet hash (sha256): {state.proof.walletHash}
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
