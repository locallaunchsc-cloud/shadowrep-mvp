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
      <main className="relative min-h-screen">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(139,92,246,0.16)_0%,transparent_45%)]" />
        <section className="relative mx-auto max-w-5xl px-6 py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
              Gates
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Create a private gate
            </h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Set requirements. Users prove they qualify. You never need to see
              their wallet — the gate returns only a yes / no result.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Form */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#8B5CF6]/30 to-[#6366F1]/20 text-purple-200">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold">Gate requirements</h2>
                  <p className="text-xs text-slate-400">
                    Configured below, evaluated against ShadowRep snapshots.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-5">
                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Gate name
                  </span>
                  <input
                    value={gateName}
                    onChange={(e) => setGateName(e.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-purple-400/40 focus:bg-black/40"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Min wallet age (days)
                    </span>
                    <input
                      type="number"
                      min={0}
                      value={minWalletAgeDays}
                      onChange={(e) => setMinWalletAgeDays(Number(e.target.value))}
                      className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-purple-400/40 focus:bg-black/40"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Min transactions
                    </span>
                    <input
                      type="number"
                      min={0}
                      value={minTxCount}
                      onChange={(e) => setMinTxCount(Number(e.target.value))}
                      className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-purple-400/40 focus:bg-black/40"
                    />
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Min volume tier
                  </span>
                  <select
                    value={minVolumeTier}
                    onChange={(e) => setMinVolumeTier(e.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-purple-400/40 focus:bg-black/40"
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

                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={requireCleanSignals}
                    onChange={(e) => setRequireCleanSignals(e.target.checked)}
                    className="h-4 w-4 accent-purple-500"
                  />
                  <span className="text-sm text-slate-200">
                    Require clean risk signals
                  </span>
                </label>
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-white/[0.02] to-transparent p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
                Live preview
              </p>
              <h3 className="mt-3 text-2xl font-black">{gateName}</h3>
              <p className="mt-2 text-xs text-slate-400">
                Encoded requirements (passed via signed URL):
              </p>
              <pre className="mt-3 overflow-auto rounded-2xl border border-white/[0.06] bg-black/40 p-4 text-[11px] leading-relaxed text-slate-300">
{JSON.stringify(
  { minWalletAgeDays, minTxCount, minVolumeTier, requireCleanSignals },
  null,
  2
)}
              </pre>

              <div className="mt-6 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Shareable verify link
                </p>
                <div className="break-all rounded-2xl border border-white/[0.06] bg-black/40 p-3 font-mono text-[11px] text-slate-300">
                  {link}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href={path}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-slate-200"
                >
                  Open verify page
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={copyLink}
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
