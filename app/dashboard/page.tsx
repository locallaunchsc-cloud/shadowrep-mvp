"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Navbar } from "@/components/Navbar";
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

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  async function analyze() {
    if (!publicKey) return;
    setLoading(true);
    setProof(null);
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress: publicKey.toBase58() }),
    });
    const data = await res.json();
    setResult(data.result);
    setProof(data.proof);
    setLoading(false);
  }

  const shareUrl = proof ? `${origin}/card/${proof.proofId}` : "";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,#1c245c_0,#080812_38%)]">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black">Generate your ShadowRep</h1>
            <p className="mt-3 text-slate-300">Connect a Solana wallet, scan mock activity, and mint a hidden-wallet proof card.</p>
          </div>
          <WalletButton />
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <p className="break-all text-sm text-slate-400">Connected: {publicKey?.toBase58() || "No wallet connected"}</p>
          <button
            onClick={analyze}
            disabled={!publicKey || loading}
            className="mt-5 rounded-full bg-purple-500 px-6 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Scanning the shadows..." : "Analyze Wallet"}
          </button>
        </div>

        {result && (
          <div className="mt-8">
            <ReputationCard result={result} proofId={proof?.proofId} />
            {proof && (
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={shareUrl} className="rounded-full bg-white px-5 py-3 font-bold text-black">Open share card</a>
                <button onClick={() => navigator.clipboard.writeText(shareUrl)} className="rounded-full border border-white/15 px-5 py-3 font-bold">Copy link</button>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
