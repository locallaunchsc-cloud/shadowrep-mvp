import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/[0.06] bg-black">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-8 w-8 place-items-center rounded-lg"
              style={{
                background:
                  "linear-gradient(180deg, #FFFFFF 0%, #F5F5F7 30%, #6A6A72 55%, #C8C8CC 75%, #B19CFF 100%)",
              }}
            >
              <ShieldCheck className="h-4 w-4 text-black" strokeWidth={2.75} />
            </span>
            <span className="font-display text-base font-extrabold tracking-tight">
              SHADOWREP
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
            Selective-disclosure reputation for Solana wallets. Prove credibility
            without exposing addresses, balances, or strategy.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
            Product
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-zinc-500">
            <li><Link href="/dashboard" className="transition hover:text-white">Dashboard</Link></li>
            <li><Link href="/gates" className="transition hover:text-white">Gates</Link></li>
            <li><Link href="/#how" className="transition hover:text-white">How it works</Link></li>
            <li><Link href="/#faq" className="transition hover:text-white">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
            Privacy
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-zinc-500">
            <li>Addresses never persisted</li>
            <li>SHA-256 hashed IDs only</li>
            <li>Signed selective proofs</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
            Ecosystem
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-zinc-500">
            <li>Solana</li>
            <li>Helius RPC</li>
            <li>Solana Attestation Service</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 font-mono text-xs uppercase text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SHADOWREP — MVP. NOT PRODUCTION.</p>
          <p>BUILT_ON :: SOLANA</p>
        </div>
      </div>
    </footer>
  );
}
