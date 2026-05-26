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
      <main className="relative min-h-screen overflow-hidden">
        <div className="blob-field">
          <div className="blob blob-white animate-blob-2 absolute right-[-15%] top-0 h-[480px] w-[480px] opacity-20" />
          <div className="blob blob-iris animate-blob-3 absolute left-[-20%] top-32 h-[420px] w-[420px] opacity-20" />
        </div>

        <section className="relative mx-auto max-w-5xl px-6 py-14">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
                // DASHBOARD
              </p>
              <h1 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-6xl">
                Generate your <br />
                <span className="chrome-text">ShadowRep.</span>
              </h1>
              <p className="mt-4 max-w-xl text-zinc-400">
                Connect a Solana wallet, scan your on-chain activity, mint a
                hidden-wallet reputation card.
              </p>
            </div>
            <WalletButton />
          </div>

          <div className="glass mt-10 rounded-3xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl border ${
                    publicKey
                      ? "border-iris/30 bg-iris/10 text-iris"
                      : "border-white/10 bg-white/5 text-zinc-500"
                  }`}
                >
                  <WalletIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    WALLET
                  </p>
                  <p className="mt-0.5 font-mono text-sm text-zinc-200">
                    {shortAddr ?? "NOT_CONNECTED"}
                  </p>
                </div>
              </div>
              <button
                onClick={analyze}
                disabled={!publicKey || loading}
                className="btn-chrome group disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:brightness-100"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Scanning chain…
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

          {!result && !loading && (
            <div className="mt-10 rounded-3xl border border-dashed border-white/10 bg-white/[0.015] p-12 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white">
                <Scan className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-extrabold">
                No scan yet
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                {publicKey
                  ? "Click Analyze wallet to read your on-chain history and generate badges."
                  : "Connect a Solana wallet to get started."}
              </p>
            </div>
          )}

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

          {result && !loading && (
            <div className="mt-10 animate-fade-in-up space-y-5">
              <ReputationCard result={result} proofId={proof?.proofId} />
              {proof && (
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`${origin}/card/${proof.proofId}`}
                    className="btn-chrome"
                  >
                    Open share card
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <button onClick={copyShare} className="btn-ghost">
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-iris" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy link
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
