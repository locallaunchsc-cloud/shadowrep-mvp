"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";

const demoGateId = "real-solana-trader";

export default function GatesPage() {
  const [gateName, setGateName] = useState("Real Solana Trader Gate");
  const [minWalletAgeDays, setMinWalletAgeDays] = useState(90);
  const [minTxCount, setMinTxCount] = useState(100);
  const [minVolumeTier, setMinVolumeTier] = useState("$1K-$10K");
  const [requireCleanSignals, setRequireCleanSignals] = useState(true);

  const encoded = encodeURIComponent(JSON.stringify({ minWalletAgeDays, minTxCount, minVolumeTier, requireCleanSignals }));
  const link = `/verify/${demoGateId}?name=${encodeURIComponent(gateName)}&requirements=${encoded}`;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#243060_0,#080812_40%)]">
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-black">Create a private gate</h1>
        <p className="mt-3 text-slate-300">Set requirements. Users prove they qualify. You never need to see their wallet.</p>

        <div className="mt-8 grid gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <label className="grid gap-2">
            <span className="text-sm text-slate-300">Gate name</span>
            <input value={gateName} onChange={(e) => setGateName(e.target.value)} className="rounded-2xl border border-white/10 bg-black/30 p-3" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm text-slate-300">Min wallet age days</span>
              <input type="number" value={minWalletAgeDays} onChange={(e) => setMinWalletAgeDays(Number(e.target.value))} className="rounded-2xl border border-white/10 bg-black/30 p-3" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-slate-300">Min transactions</span>
              <input type="number" value={minTxCount} onChange={(e) => setMinTxCount(Number(e.target.value))} className="rounded-2xl border border-white/10 bg-black/30 p-3" />
            </label>
          </div>
          <label className="grid gap-2">
            <span className="text-sm text-slate-300">Min volume tier</span>
            <select value={minVolumeTier} onChange={(e) => setMinVolumeTier(e.target.value)} className="rounded-2xl border border-white/10 bg-black/30 p-3">
              {["$0-$100", "$100-$1K", "$1K-$10K", "$10K-$50K", "$50K+"].map((tier) => <option key={tier}>{tier}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input type="checkbox" checked={requireCleanSignals} onChange={(e) => setRequireCleanSignals(e.target.checked)} />
            Require clean signals
          </label>
          <a href={link} className="w-fit rounded-full bg-white px-6 py-3 font-bold text-black">Open verification link</a>
        </div>
      </section>
    </main>
  );
}
