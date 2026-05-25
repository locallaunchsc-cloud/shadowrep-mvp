import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  Eye,
  Lock,
  Shield,
  Sparkles,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(139,92,246,0.25)_0%,transparent_45%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.18)_0%,transparent_50%)]" />
          <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-24">
            <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="animate-fade-in-up">
                <p className="inline-flex items-center gap-2 rounded-full border border-purple-300/20 bg-purple-300/[0.08] px-4 py-1.5 text-xs font-medium tracking-wide text-purple-200">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400" />
                  </span>
                  Live on Solana mainnet
                </p>
                <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                  Prove your{" "}
                  <span className="bg-gradient-to-r from-[#A78BFA] via-[#8B5CF6] to-[#6366F1] bg-clip-text text-transparent">
                    Solana reputation
                  </span>
                  . Privately.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                  ShadowRep turns your on-chain history into selective-disclosure
                  credentials. Traders, communities, and launchpads verify
                  credibility — without ever seeing your wallet.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-200"
                  >
                    Generate your ShadowRep
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/gates"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Create a private gate
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5" />
                    Wallet addresses never persisted
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3.5 w-3.5" />
                    SHA-256 hashed identifiers
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Signed selective proofs
                  </div>
                </div>
              </div>

              {/* Card preview */}
              <div className="relative animate-fade-in-up [animation-delay:120ms]">
                <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-[#8B5CF6]/30 via-transparent to-[#6366F1]/20 blur-3xl" />
                <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-1 shadow-card backdrop-blur-xl">
                  <div className="rounded-[1.4rem] bg-[#0a0a14]/80 p-6">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-purple-300">
                        ShadowRep Verified
                      </p>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                        Live
                      </span>
                    </div>
                    <h2 className="mt-4 text-4xl font-black tracking-tight">
                      Gold Trader
                    </h2>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                      <span>Score 78 / 100</span>
                      <span className="text-slate-600">·</span>
                      <span>Tier 3 of 5</span>
                    </div>

                    <div className="mt-6 grid gap-2">
                      {[
                        { icon: Award, label: "Aged Wallet", note: "420+ days" },
                        { icon: BarChart3, label: "Volume Verified", note: "$10K–$50K range" },
                        { icon: CheckCircle2, label: "Clean Signals", note: "No risk flags" },
                        { icon: Sparkles, label: "Protocol Explorer", note: "Jupiter · Drift · Tensor" },
                      ].map(({ icon: Icon, label, note }) => (
                        <div
                          key={label}
                          className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                        >
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-purple-500/15 text-purple-300">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="flex-1">
                            <p className="text-sm font-semibold">{label}</p>
                            <p className="text-[11px] text-slate-500">{note}</p>
                          </div>
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-xl bg-black/30 p-3 font-mono text-[10px] leading-relaxed text-slate-500">
                      <p>wallet: <span className="text-slate-600">●●●●●●●●●●●●●●●●●●●●●●●●●●●●</span></p>
                      <p>hash&nbsp;&nbsp;: 7f3a91…b2e8</p>
                      <p>proof&nbsp;: signed · valid 30d</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-y border-white/5 bg-black/20">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-6 text-[11px] uppercase tracking-[0.25em] text-slate-500">
            <span>Built for</span>
            <span className="text-slate-300">Solana</span>
            <span className="text-slate-700">·</span>
            <span className="text-slate-300">Helius RPC</span>
            <span className="text-slate-700">·</span>
            <span className="text-slate-300">Attestation Service</span>
            <span className="text-slate-700">·</span>
            <span className="text-slate-300">Jupiter</span>
            <span className="text-slate-700">·</span>
            <span className="text-slate-300">Phantom · Solflare</span>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
              How it works
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Four steps. Zero wallet leakage.
            </h2>
            <p className="mt-4 text-slate-400">
              Your wallet stays yours. ShadowRep turns the history into something
              you can share without showing the address.
            </p>
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                icon: Wallet,
                title: "Connect",
                body: "Sign in with Phantom or Solflare on Solana mainnet. No off-chain credentials.",
              },
              {
                n: "02",
                icon: BarChart3,
                title: "Analyze",
                body: "ShadowRep reads your real on-chain history via Helius — never your private keys.",
              },
              {
                n: "03",
                icon: Award,
                title: "Earn badges",
                body: "Aged wallet, clean signals, volume tier, protocol diversity — issued automatically.",
              },
              {
                n: "04",
                icon: Eye,
                title: "Share or gate",
                body: "Mint a hidden-wallet card or pass a private gate. Verifiers see proof, not the wallet.",
              },
            ].map(({ n, icon: Icon, title, body }) => (
              <div
                key={n}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#8B5CF6]/30 to-[#6366F1]/20 text-purple-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-slate-600">{n}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-white/[0.02] to-transparent p-8 lg:row-span-2">
              <Shield className="h-7 w-7 text-purple-300" />
              <h3 className="mt-6 text-2xl font-bold">
                Selective disclosure, not surveillance.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Verifiers receive cryptographically signed claims about your
                wallet — never the wallet itself. Your address, balances, and
                strategy stay private.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-slate-300">
                {[
                  "SHA-256 hashed wallet identifiers only",
                  "HMAC-signed reputation proofs",
                  "Roadmap: Solana Attestation Service + ZK",
                  "No public wallet, no public history",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
              <Zap className="h-7 w-7 text-purple-300" />
              <h3 className="mt-6 text-xl font-bold">Real-time on-chain reads</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Helius-powered signature pagination and parsed-transaction
                analysis. Wallet age, swap protocols, transaction count —
                straight from mainnet.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
              <Users className="h-7 w-7 text-purple-300" />
              <h3 className="mt-6 text-xl font-bold">Private community gates</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Filter bots, sybils, and fake screenshots without ever seeing a
                member&apos;s wallet. The gate returns qualified or not
                qualified — that&apos;s it.
              </p>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
              For who
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Trust, without the receipts.
            </h2>
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {[
              {
                tag: "Traders",
                title: "Flex credibility, not your map.",
                body: "Show track record to potential allocators or copy-traders without handing them the entire wallet they could front-run.",
              },
              {
                tag: "Communities",
                title: "Gate chats by behavior, not screenshots.",
                body: "Discord and Telegram groups verify real on-chain activity privately. No more “send a screenshot of your wallet.”",
              },
              {
                tag: "Launchpads",
                title: "Filter bots. Respect users.",
                body: "Run sybil filters and quality gates on participants without collecting their wallet addresses or transaction histories.",
              },
            ].map((card) => (
              <div
                key={card.tag}
                className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04]"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                  {card.tag}
                </p>
                <h3 className="mt-4 text-xl font-bold">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">
              FAQ
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Questions, answered.
            </h2>
          </div>
          <div className="mt-14 space-y-3">
            {[
              {
                q: "Does ShadowRep see my private keys?",
                a: "No. ShadowRep only uses your wallet's public address to read on-chain data, the same way Solscan or Phantom does. Signing happens in your wallet — nothing private leaves your device.",
              },
              {
                q: "Is this zero-knowledge?",
                a: "Not yet. The MVP uses selective disclosure with HMAC signatures: verifiers trust the ShadowRep issuer to attest to your stats. The roadmap includes ZK-compressed badges via Light Protocol and on-chain attestations via Solana Attestation Service.",
              },
              {
                q: "What data is stored?",
                a: "Wallet addresses are never persisted. Internally ShadowRep stores only SHA-256 hashed identifiers, badge metadata, and signed proofs. Raw address bytes never hit the database.",
              },
              {
                q: "How do verifiers know a proof is real?",
                a: "Every reputation card and gate verification is signed by the ShadowRep issuer key. Verifiers receive a payload + signature pair. Tampered data fails verification.",
              },
              {
                q: "Can I lose my reputation?",
                a: "No. A wallet's history is its history. Cards expire on a 30-day timer so consumers know they're seeing recent state — but the underlying signal is permanent.",
              },
              {
                q: "Is there a token?",
                a: "No. ShadowRep is not launching a token in the MVP phase. The roadmap evaluates token economics only after product usage justifies it.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition hover:border-white/15 open:border-white/15 open:bg-white/[0.04]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {item.q}
                  <span className="ml-auto text-2xl font-light text-slate-500 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/40 via-[#0a0a14] to-indigo-900/30 p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.25)_0%,transparent_60%)]" />
            <div className="relative">
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                Generate your ShadowRep.
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Connect once. Get a hidden-wallet credential you actually own.
              </p>
              <Link
                href="/dashboard"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-slate-200"
              >
                Open the app
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
