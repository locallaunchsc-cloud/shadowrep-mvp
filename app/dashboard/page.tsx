"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  ArrowRight,
  Check,
  Copy,
  Loader2,
  Scan,
  Wallet as WalletIcon,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WalletButton } from "@/components/WalletButton";
import { ReputationCard } from "@/components/ReputationCard";
import type { ReputationResult } from "@/lib/scoring";
import type { ProofPayload } from "@/lib/proofs";

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const [result, setResult] = useState<ReputationResult | null>(null);
  const [proof, setProof] = useState<ProofPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  async function analyze() {
    if (!publicKey) return;
    setLoading(true);
    setProof(null);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: publicKey.toBase58() }),
      });
      const data = await res.json();
      setResult(data.result);
      setProof(data.proof);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function copyShare() {
    if (!proof) return;
    navigator.clipboard.writeText(`${origin}/card/${proof.proofId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const shortAddr = publicKey
    ? `${publicKey.toBase58().slice(0, 6)}…${publicKey.toBase58().slice(-4)}`
    : null;

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_-10%,rgba(99,102,241,0.18)_0%,transparent_45%)]" />
        <section className="relative mx-auto max-w-5xl px-6 py-14">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
                Dashboard
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Generate your ShadowRep
              </h1>
              <p className="mt-3 max-w-xl text-slate-400">
                Connect a Solana wallet, scan your on-chain activity, and mint a
                hidden-wallet reputation card.
              </p>
            </div>
            <WalletButton />
          </div>

          {/* Status panel */}
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl ${
                    publicKey
                      ? "bg-emerald-400/15 text-emerald-300"
                      : "bg-white/5 text-slate-500"
                  }`}
                >
                  <WalletIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Wallet
                  </p>
                  <p className="font-mono text-sm text-slate-200">
                    {shortAddr ?? "Not connected"}
                  </p>
                </div>
              </div>
              <button
                onClick={analyze}
                disabled={!publicKey || loading}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Scanning on-chain activity…
                  </>
                ) : (
                  <>
                    <Scan className="h-4 w-4" />
                    {result ? "Re-scan wallet" : "Analyze wallet"}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Empty state */}
          {!result && !loading && (
            <div className="mt-10 rounded-3xl border border-dashed border-white/10 bg-white/[0.015] p-12 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-purple-500/10 text-purple-300">
                <Scan className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold">No scan yet</h3>
              <p className="mt-2 text-sm text-slate-400">
                {publicKey
                  ? "Click Analyze wallet to read your on-chain history and generate badges."
                  : "Connect a Solana wallet to get started."}
              </p>
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="mt-10 animate-pulse rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <div className="h-4 w-24 rounded-full bg-white/10" />
              <div className="mt-4 h-10 w-48 rounded-lg bg-white/10" />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 rounded-2xl bg-white/[0.04]" />
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {result && !loading && (
            <div className="mt-10 animate-fade-in-up space-y-5">
              <ReputationCard result={result} proofId={proof?.proofId} />
              {proof && (
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`${origin}/card/${proof.proofId}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-slate-200"
                  >
                    Open share card
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <button
                    onClick={copyShare}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-300" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy share link
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
