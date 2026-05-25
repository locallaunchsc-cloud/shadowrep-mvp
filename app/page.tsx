import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#2b145f_0,#080812_45%)]">
      <Navbar />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-purple-300/20 bg-purple-300/10 px-4 py-2 text-sm text-purple-100">
            Private proof for Solana reputation
          </p>
          <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-7xl">
            Prove you’re real without leaking your wallet.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            ShadowRep lets traders, creators, and communities verify crypto credibility while hiding wallet addresses, exact balances, bags, and strategy.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/dashboard" className="rounded-full bg-white px-6 py-3 font-bold text-black hover:bg-slate-200">
              Generate Your ShadowRep
            </Link>
            <Link href="/gates" className="rounded-full border border-white/15 px-6 py-3 font-bold hover:bg-white/10">
              Create Private Gate
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-glow backdrop-blur">
          <div className="rounded-3xl bg-black/40 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-purple-200">ShadowRep Verified</p>
            <h2 className="mt-3 text-4xl font-black">Gold Trader</h2>
            <p className="mt-2 text-slate-300">Wallet hidden. Reputation visible.</p>
            <div className="mt-8 grid gap-3">
              {[
                "Wallet age: 1y+",
                "Volume: $10K+ range",
                "Risk signals: clean",
                "Protocols: Jupiter, Drift, Tensor",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">✅ {item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-20 md:grid-cols-3">
        {[
          ["For traders", "Flex credibility without giving copy-traders your entire map."],
          ["For communities", "Gate chats by real on-chain behavior, not fake screenshots."],
          ["For launchpads", "Filter bots and sybils while respecting user privacy."],
        ].map(([title, body]) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-black">{title}</h3>
            <p className="mt-3 text-slate-400">{body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
