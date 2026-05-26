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

const TRUST_LOGOS = [
  "SOLANA",
  "HELIUS RPC",
  "ATTESTATION SERVICE",
  "JUPITER",
  "PHANTOM",
  "SOLFLARE",
  "LIGHT PROTOCOL",
  "BIRDEYE",
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        {/* ============== HERO ============== */}
        <section className="relative overflow-hidden pb-28 pt-12 sm:pt-20">
          {/* Animated blob field */}
          <div className="blob-field">
            <div className="blob blob-acid animate-blob-1 absolute -left-32 top-0 h-[480px] w-[480px]" />
            <div className="blob blob-cyber animate-blob-2 absolute right-[-10%] top-20 h-[520px] w-[520px]" />
            <div className="blob blob-magenta animate-blob-3 absolute left-1/3 top-40 h-[380px] w-[380px] opacity-30" />
          </div>

          {/* Scanline veil */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.4)_70%,#000_100%)]" />

          <div className="relative mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="animate-fade-in-up">
                <p className="inline-flex items-center gap-2 rounded-full border border-acid/30 bg-acid/10 px-4 py-1.5 font-mono text-[11px] tracking-wider text-acid">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
                  </span>
                  LIVE_ON_SOLANA_MAINNET
                </p>
                <h1 className="mt-6 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-[5.5rem]">
                  Solana
                  <br />
                  reputation,
                  <br />
                  <span className="holo-text">in the dark.</span>
                </h1>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-400">
                  ShadowRep turns your on-chain history into
                  selective-disclosure credentials. Verify trader credibility,
                  gate communities, filter sybils — without ever exposing the
                  wallet.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link href="/dashboard" className="btn-acid group">
                    Generate ShadowRep
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>
                  <Link href="/gates" className="btn-ghost">
                    Create private gate
                  </Link>
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                  <div className="flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 text-acid" />
                    no_address_persisted
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3.5 w-3.5 text-cyber" />
                    sha256_hashed_only
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-iris" />
                    signed_proofs
                  </div>
                </div>
              </div>

              {/* Hero card with conic gradient border */}
              <div className="relative animate-fade-in-up [animation-delay:120ms]">
                <div className="conic-border tilt rounded-3xl p-7 shadow-card">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">
                      // SHADOWREP::VERIFIED
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-acid/40 bg-acid/10 px-2 py-0.5 font-mono text-[10px] font-bold text-acid">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
                      </span>
                      LIVE
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-5xl font-black tracking-tight">
                    <span className="holo-text">GOLD</span>
                    <br />
                    <span className="text-white">TRADER</span>
                  </h2>
                  <div className="mt-2 flex items-center gap-2 font-mono text-[11px] text-slate-400">
                    <span className="text-acid">SCORE_78/100</span>
                    <span className="text-slate-600">·</span>
                    <span>TIER_03/05</span>
                  </div>

                  <div className="mt-6 grid gap-2">
                    {[
                      { icon: Award, label: "Aged Wallet", note: "420d+", color: "text-acid" },
                      { icon: BarChart3, label: "Volume Verified", note: "$10K–$50K", color: "text-cyber" },
                      { icon: CheckCircle2, label: "Clean Signals", note: "no_flags", color: "text-acid" },
                      { icon: Sparkles, label: "Protocol Explorer", note: "JUP·DRIFT·TENSOR", color: "text-iris" },
                    ].map(({ icon: Icon, label, note, color }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                      >
                        <span className={`grid h-8 w-8 place-items-center rounded-lg bg-white/5 ${color}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-bold">{label}</p>
                          <p className={`font-mono text-[10px] ${color}`}>{note}</p>
                        </div>
                        <CheckCircle2 className="h-4 w-4 text-acid" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/50 p-3 font-mono text-[10px] leading-relaxed text-slate-500">
                    <p>wallet : <span className="text-slate-700">●●●●●●●●●●●●●●●●●●●●●●●●●●●●</span></p>
                    <p>hash&nbsp;&nbsp; : <span className="text-cyber">7f3a91…b2e8</span></p>
                    <p>proof&nbsp; : <span className="text-acid">signed</span> · valid_30d</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============== MARQUEE TRUST STRIP ============== */}
        <section className="relative overflow-hidden border-y border-white/[0.06] bg-black py-5">
          <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />
          <div className="marquee-track">
            {[...Array(2)].flatMap((_, group) =>
              TRUST_LOGOS.map((logo, i) => (
                <div
                  key={`${group}-${i}`}
                  className="mx-10 flex flex-shrink-0 items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-slate-500"
                >
                  <span className="text-acid">▸</span>
                  {logo}
                </div>
              ))
            )}
          </div>
        </section>

        {/* ============== HOW IT WORKS ============== */}
        <section id="how" className="relative mx-auto max-w-6xl px-6 py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-acid">
              // HOW_IT_WORKS
            </p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-6xl">
              Four steps. <br />
              <span className="holo-text">Zero leakage.</span>
            </h2>
            <p className="mt-5 text-slate-400">
              Your wallet stays yours. ShadowRep turns the history into something
              you can share without showing the address.
            </p>
          </div>
          <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", icon: Wallet, title: "Connect", body: "Sign in with Phantom or Solflare. No off-chain credentials.", chip: "border-acid/30 bg-acid/10 text-acid" },
              { n: "02", icon: BarChart3, title: "Analyze", body: "ShadowRep reads your real on-chain history via Helius — never your private keys.", chip: "border-cyber/30 bg-cyber/10 text-cyber" },
              { n: "03", icon: Award, title: "Earn", body: "Aged wallet, clean signals, volume tier, protocol diversity — issued automatically.", chip: "border-iris/30 bg-iris/10 text-iris" },
              { n: "04", icon: Eye, title: "Share / gate", body: "Mint a hidden-wallet card or pass a private gate. Verifiers see proof, not the wallet.", chip: "border-magenta/30 bg-magenta/10 text-magenta" },
            ].map(({ n, icon: Icon, title, body, chip }) => (
              <div
                key={n}
                className="group glass tilt relative rounded-2xl p-6 transition"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl border ${chip}`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <span className="font-mono text-xs text-slate-600">{n}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============== FEATURES ============== */}
        <section className="relative overflow-hidden py-24">
          <div className="blob-field">
            <div className="blob blob-iris animate-blob-1 absolute left-[-15%] top-1/4 h-[420px] w-[420px] opacity-25" />
            <div className="blob blob-cyber animate-blob-3 absolute right-[-10%] bottom-0 h-[480px] w-[480px] opacity-25" />
          </div>
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Large block */}
              <div className="holo-surface tilt rounded-3xl border border-white/[0.08] p-8 lg:row-span-2">
                <Shield className="h-8 w-8 text-acid" />
                <h3 className="mt-6 font-display text-3xl font-extrabold tracking-tight">
                  Selective disclosure.
                  <br />
                  <span className="text-acid">Not surveillance.</span>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Verifiers receive cryptographically signed claims about your
                  wallet — never the wallet itself. Address, balances, strategy
                  stay private.
                </p>
                <ul className="mt-8 space-y-3 text-sm text-slate-200">
                  {[
                    "SHA-256 hashed wallet identifiers only",
                    "HMAC-signed reputation proofs",
                    "Roadmap: Solana Attestation Service + ZK",
                    "No public wallet, no public history",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-acid" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass tilt rounded-3xl p-8">
                <Zap className="h-7 w-7 text-cyber" />
                <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight">
                  Real-time on-chain reads
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Helius-powered signature pagination and parsed-transaction
                  analysis. Wallet age, swap protocols, transaction count —
                  straight from mainnet.
                </p>
              </div>

              <div className="glass tilt rounded-3xl p-8">
                <Users className="h-7 w-7 text-iris" />
                <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight">
                  Private community gates
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Filter bots, sybils, and fake screenshots without ever seeing a
                  member&apos;s wallet. Gate returns qualified or not.
                  That&apos;s it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============== USE CASES ============== */}
        <section className="mx-auto max-w-6xl px-6 py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyber">
              // FOR_WHO
            </p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-6xl">
              Trust, <span className="holo-text">no receipts.</span>
            </h2>
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {[
              {
                tag: "Traders",
                tagColor: "text-acid border-acid/30 bg-acid/10",
                title: "Flex credibility, not your map.",
                body: "Show track record to allocators or copy-traders without handing them the wallet they could front-run.",
              },
              {
                tag: "Communities",
                tagColor: "text-cyber border-cyber/30 bg-cyber/10",
                title: "Gate by behavior, not screenshots.",
                body: "Discord and Telegram groups verify real on-chain activity privately. No more “send a screenshot of your wallet.”",
              },
              {
                tag: "Launchpads",
                tagColor: "text-iris border-iris/30 bg-iris/10",
                title: "Filter bots. Respect users.",
                body: "Run sybil filters and quality gates without collecting wallet addresses or transaction histories.",
              },
            ].map((card) => (
              <div
                key={card.tag}
                className="glass tilt group rounded-3xl p-7"
              >
                <span
                  className={`inline-flex rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${card.tagColor}`}
                >
                  {card.tag}
                </span>
                <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============== FAQ ============== */}
        <section id="faq" className="mx-auto max-w-3xl px-6 py-32">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-magenta">
              // FAQ
            </p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-6xl">
              Questions, <span className="holo-text">answered.</span>
            </h2>
          </div>
          <div className="mt-14 space-y-3">
            {[
              { q: "Does ShadowRep see my private keys?", a: "No. ShadowRep only uses your wallet's public address to read on-chain data, the same way Solscan or Phantom does. Signing happens in your wallet — nothing private leaves your device." },
              { q: "Is this zero-knowledge?", a: "Not yet. The MVP uses selective disclosure with HMAC signatures: verifiers trust the ShadowRep issuer to attest to your stats. The roadmap includes ZK-compressed badges via Light Protocol and on-chain attestations via Solana Attestation Service." },
              { q: "What data is stored?", a: "Wallet addresses are never persisted. Internally ShadowRep stores only SHA-256 hashed identifiers, badge metadata, and signed proofs. Raw address bytes never hit the database." },
              { q: "How do verifiers know a proof is real?", a: "Every reputation card and gate verification is signed by the ShadowRep issuer key. Verifiers receive a payload + signature pair. Tampered data fails verification." },
              { q: "Can I lose my reputation?", a: "No. A wallet's history is its history. Cards expire on a 30-day timer so consumers know they're seeing recent state — but the underlying signal is permanent." },
              { q: "Is there a token?", a: "No. ShadowRep is not launching a token in the MVP phase. The roadmap evaluates token economics only after product usage justifies it." },
            ].map((item) => (
              <details
                key={item.q}
                className="group glass rounded-2xl p-5 transition open:border-acid/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  <span>{item.q}</span>
                  <span className="ml-auto font-mono text-2xl font-light text-slate-500 transition group-open:rotate-45 group-open:text-acid">
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

        {/* ============== CTA ============== */}
        <section className="relative mx-auto max-w-6xl px-6 pb-24">
          <div className="conic-border relative overflow-hidden rounded-3xl p-12 text-center sm:p-20">
            <div className="absolute inset-0 holo-surface" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,133,0.15)_0%,transparent_60%)]" />
            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-acid">
                // READY
              </p>
              <h2 className="mt-4 font-display text-5xl font-black tracking-tight sm:text-7xl">
                Step into the <span className="holo-text">shadow.</span>
              </h2>
              <p className="mt-6 text-lg text-slate-300">
                Connect once. Get a hidden-wallet credential you actually own.
              </p>
              <Link href="/dashboard" className="btn-acid mt-10 text-sm">
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
