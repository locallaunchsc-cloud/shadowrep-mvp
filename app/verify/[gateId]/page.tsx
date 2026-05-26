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
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="rounded-full border border-cyber/30 bg-cyber/10 px-3 py-1 font-bold tracking-wider text-cyber">
            PRIVATE_GATE
          </span>
          <span className="text-slate-500">{params.gateId}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-6xl">
          {gateName}
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400">
          Connect your wallet to prove eligibility. The gate receives a yes /
          no result — never your public wallet address.
        </p>
      </div>

      {/* Requirements + action */}
      <div className="conic-border mt-10 rounded-3xl p-7">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-acid/30 bg-acid/10 text-acid">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-sm font-extrabold">Requirements</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
              EVALUATED AGAINST YOUR SHADOWREP SNAPSHOT
            </p>
          </div>
        </div>
        <pre className="mt-5 overflow-auto rounded-2xl border border-white/[0.06] bg-black/60 p-4 text-[11px] leading-relaxed text-cyber">
{JSON.stringify(requirements, null, 2)}
        </pre>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-slate-500">
            <Lock className="h-3.5 w-3.5 text-acid" />
            wallet_never_transmitted
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <WalletButton />
            <button
              onClick={verify}
              disabled={!publicKey || loading}
              className="btn-acid disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:brightness-100"
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
              ? "border-acid/40 bg-acid/[0.05] shadow-acid"
              : "border-magenta/40 bg-magenta/[0.05] shadow-magenta"
          }`}
        >
          <div className="flex items-start gap-4">
            <span
              className={`grid h-14 w-14 place-items-center rounded-2xl ${
                result.qualified
                  ? "bg-acid/15 text-acid"
                  : "bg-magenta/15 text-magenta"
              }`}
            >
              {result.qualified ? (
                <CheckCircle2 className="h-7 w-7" strokeWidth={2.25} />
              ) : (
                <XCircle className="h-7 w-7" strokeWidth={2.25} />
              )}
            </span>
            <div>
              <h2 className="font-display text-3xl font-black tracking-tight">
                {result.qualified ? (
                  <span className="text-acid">QUALIFIED</span>
                ) : (
                  <span className="text-magenta">NOT_QUALIFIED</span>
                )}
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
                    ? "border-acid/15 bg-acid/[0.04]"
                    : "border-magenta/15 bg-magenta/[0.04]"
                }`}
              >
                <span className="text-slate-200">{check.label}</span>
                <span
                  className={`inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase ${
                    check.passed ? "text-acid" : "text-magenta"
                  }`}
                >
                  {check.passed ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      PASS
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4" />
                      FAIL
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
      <main className="relative min-h-screen overflow-hidden">
        <div className="blob-field">
          <div className="blob blob-magenta animate-blob-1 absolute left-[-15%] top-10 h-[420px] w-[420px] opacity-25" />
          <div className="blob blob-acid animate-blob-2 absolute right-[-10%] top-32 h-[460px] w-[460px] opacity-25" />
        </div>
        <div className="relative">
          <Suspense
            fallback={
              <div className="mx-auto max-w-3xl px-6 py-14 font-mono text-slate-400">
                LOADING_GATE…
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
