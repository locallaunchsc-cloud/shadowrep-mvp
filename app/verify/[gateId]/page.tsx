"use client";

import { Suspense, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { Navbar } from "@/components/Navbar";
import { WalletButton } from "@/components/WalletButton";

type GateResult = { qualified: boolean; checks: { label: string; passed: boolean }[] };

function VerifyGateInner() {
  const params = useParams<{ gateId: string }>();
  const search = useSearchParams();
  const { publicKey } = useWallet();
  const [result, setResult] = useState<GateResult | null>(null);
  const [loading, setLoading] = useState(false);

  const gateName = search.get("name") || "Private Gate";
  const requirements = useMemo(() => {
    try {
      return JSON.parse(search.get("requirements") || "{}");
    } catch {
      return {};
    }
  }, [search]);

  async function verify() {
    if (!publicKey) return;
    setLoading(true);
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress: publicKey.toBase58(), requirements }),
    });
    const data = await res.json();
    setResult(data.gateResult);
    setLoading(false);
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm text-purple-200">Gate ID: {params.gateId}</p>
      <h1 className="mt-2 text-4xl font-black">{gateName}</h1>
      <p className="mt-3 text-slate-300">
        Connect your wallet to prove eligibility. The gate receives a yes/no
        result, not your public wallet.
      </p>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.05] p-6">
        <WalletButton />
        <pre className="mt-5 overflow-auto rounded-2xl bg-black/40 p-4 text-sm text-slate-300">
          {JSON.stringify(requirements, null, 2)}
        </pre>
        <button
          onClick={verify}
          disabled={!publicKey || loading}
          className="mt-5 rounded-full bg-purple-500 px-6 py-3 font-bold disabled:opacity-40"
        >
          {loading ? "Verifying..." : "Verify Privately"}
        </button>
      </div>

      {result && (
        <div
          className={`mt-8 rounded-3xl border p-6 ${
            result.qualified
              ? "border-emerald-400/40 bg-emerald-400/10"
              : "border-red-400/40 bg-red-400/10"
          }`}
        >
          <h2 className="text-3xl font-black">
            {result.qualified ? "Qualified" : "Not Qualified"}
          </h2>
          <div className="mt-5 grid gap-2">
            {result.checks.map((check) => (
              <p key={check.label} className="rounded-xl bg-black/20 p-3">
                {check.passed ? "PASS" : "FAIL"} — {check.label}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function VerifyGatePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#3b1f5f_0,#080812_42%)]">
      <Navbar />
      <Suspense fallback={<div className="mx-auto max-w-3xl px-6 py-12 text-slate-300">Loading gate…</div>}>
        <VerifyGateInner />
      </Suspense>
    </main>
  );
}
