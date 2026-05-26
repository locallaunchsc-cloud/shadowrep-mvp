"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const demoGateId = "real-solana-trader";

export default function GatesPage() {
  const [gateName, setGateName] = useState("Real Solana Trader Gate");
  const [minWalletAgeDays, setMinWalletAgeDays] = useState(90);
  const [minTxCount, setMinTxCount] = useState(100);
  const [minVolumeTier, setMinVolumeTier] = useState("$1K-$10K");
  const [requireCleanSignals, setRequireCleanSignals] = useState(true);
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const encoded = encodeURIComponent(
    JSON.stringify({ minWalletAgeDays, minTxCount, minVolumeTier, requireCleanSignals })
  );
  const path = `/verify/${demoGateId}?name=${encodeURIComponent(gateName)}&requirements=${encoded}`;
  const link = origin ? `${origin}${path}` : path;

  function copyLink() {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden">
        <div className="blob-field">
          <div className="blob blob-silver animate-blob-1 absolute left-[-10%] top-0 h-[420px] w-[420px] opacity-20" />
          <div className="blob blob-iris animate-blob-3 absolute right-[-10%] top-40 h-[380px] w-[380px] opacity-20" />
        </div>

        <section className="relative mx-auto max-w-5xl px-6 py-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
              // GATES
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-6xl">
              Create a <span className="chrome-text">private gate.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Set requirements. Users prove they qualify. You never need to see
              their wallet — the gate returns only a yes / no result.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="glass rounded-3xl p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-extrabold">
                    Gate requirements
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    EVALUATED AGAINST SHADOWREP SNAPSHOTS
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-5">
                <label className="grid gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                    GATE_NAME
                  </span>
                  <input
                    value={gateName}
                    onChange={(e) => setGateName(e.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-white/30 focus:bg-black/60 focus:shadow-ring"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      MIN_WALLET_AGE_DAYS
                    </span>
                    <input
                      type="number"
                      min={0}
                      value={minWalletAgeDays}
                      onChange={(e) => setMinWalletAgeDays(Number(e.target.value))}
                      className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-white/30 focus:bg-black/60 focus:shadow-ring"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      MIN_TRANSACTIONS
                    </span>
                    <input
                      type="number"
                      min={0}
                      value={minTxCount}
                      onChange={(e) => setMinTxCount(Number(e.target.value))}
                      className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-white/30 focus:bg-black/60 focus:shadow-ring"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                    MIN_VOLUME_TIER
                  </span>
                  <select
                    value={minVolumeTier}
                    onChange={(e) => setMinVolumeTier(e.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-white/30 focus:bg-black/60 focus:shadow-ring"
                  >
                    {["$0-$100", "$100-$1K", "$1K-$10K", "$10K-$50K", "$50K+"].map(
                      (tier) => (
                        <option key={tier} value={tier}>
                          {tier}
                        </option>
                      )
                    )}
                  </select>
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={requireCleanSignals}
                    onChange={(e) => setRequireCleanSignals(e.target.checked)}
                    className="h-4 w-4 accent-iris"
                  />
                  <span className="text-sm text-zinc-200">
                    Require clean risk signals
                  </span>
                </label>
              </div>
            </div>

            <div className="chrome-border rounded-3xl p-7">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
                // LIVE_PREVIEW
              </p>
              <h3 className="mt-3 font-display text-2xl font-black">
                {gateName}
              </h3>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                ENCODED REQUIREMENTS (SIGNED URL):
              </p>
              <pre className="mt-3 overflow-auto rounded-2xl border border-white/[0.06] bg-black/60 p-4 text-[11px] leading-relaxed text-zinc-300">
{JSON.stringify(
  { minWalletAgeDays, minTxCount, minVolumeTier, requireCleanSignals },
  null,
  2
)}
              </pre>

              <div className="mt-6 space-y-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  SHAREABLE_VERIFY_LINK
                </p>
                <div className="break-all rounded-2xl border border-white/[0.06] bg-black/60 p-3 font-mono text-[11px] text-iris">
                  {link}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link href={path} className="btn-chrome">
                  Open verify page
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button onClick={copyLink} className="btn-ghost">
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
