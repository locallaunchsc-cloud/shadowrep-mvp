"use client";

import { Suspense, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  CheckCircle2,
  Loader2,
  Lock,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WalletButton } from "@/components/WalletButton";

type GateResult = {
  qualified: boolean;
  checks: { label: string; passed: boolean }[];
};

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
    setResult(null);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: publicKey.toBase58(),
          requirements,
        }),
      });
      const data = await res.json();
      setResult(data.gateResult);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative mx-auto max-w-3xl px-6 py-14">
      <div>
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full border border-purple-300/20 bg-purple-300/[0.08] px-3 py-1 font-medium tracking-wide text-purple-200">
            Private gate
          </span>
          <span className="font-mono text-slate-500">{params.gateId}</span>
        </div>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          {gateName}
        </h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Connect your wallet to prove eligibility. The gate receives a yes /
          no result — never your public wallet address.
        </p>
      </div>

      {/* Requirements + action */}
      <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-7">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#8B5CF6]/30 to-[#6366F1]/20 text-purple-200">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold">Requirements</p>
            <p className="text-xs text-slate-400">
              Evaluated against your ShadowRep snapshot
            </p>
          </div>
        </div>
        <pre className="mt-5 overflow-auto rounded-2xl border border-white/[0.06] bg-black/40 p-4 text-[11px] leading-relaxed text-slate-300">
{JSON.stringify(requirements, null, 2)}
        </pre>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" />
            Wallet address never transmitted to gate owner
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <WalletButton />
            <button
              onClick={verify}
              disabled={!publicKey || loading}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying privately…
                </>
              ) : (
                "Verify privately"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div
          className={`mt-8 animate-fade-in-up overflow-hidden rounded-3xl border p-7 ${
            result.qualified
              ? "border-emerald-400/30 bg-emerald-400/[0.06]"
              : "border-red-400/30 bg-red-400/[0.06]"
          }`}
        >
          <div className="flex items-start gap-4">
            <span
              className={`grid h-12 w-12 place-items-center rounded-2xl ${
                result.qualified
                  ? "bg-emerald-400/15 text-emerald-300"
                  : "bg-red-400/15 text-red-300"
              }`}
            >
              {result.qualified ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <XCircle className="h-6 w-6" />
              )}
            </span>
            <div>
              <h2 className="text-3xl font-black">
                {result.qualified ? "Qualified" : "Not qualified"}
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                {result.qualified
                  ? "Your wallet meets every requirement for this gate."
                  : "Your wallet does not currently meet the gate requirements."}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-2">
            {result.checks.map((check) => (
              <div
                key={check.label}
                className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm ${
                  check.passed
                    ? "border-emerald-400/15 bg-emerald-400/[0.04]"
                    : "border-red-400/15 bg-red-400/[0.04]"
                }`}
              >
                <span className="text-slate-200">{check.label}</span>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                    check.passed ? "text-emerald-300" : "text-red-300"
                  }`}
                >
                  {check.passed ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Pass
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4" />
                      Fail
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function VerifyGatePage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(139,92,246,0.18)_0%,transparent_45%)]" />
        <div className="relative">
          <Suspense
            fallback={
              <div className="mx-auto max-w-3xl px-6 py-14 text-slate-400">
                Loading gate…
              </div>
            }
          >
            <VerifyGateInner />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
