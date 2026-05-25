import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#6366F1]">
              <ShieldCheck className="h-4 w-4 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-base font-bold tracking-tight">ShadowRep</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Selective-disclosure reputation for Solana wallets. Prove
            credibility without exposing addresses, balances, or strategy.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Product
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            <li><Link href="/dashboard" className="transition hover:text-white">Dashboard</Link></li>
            <li><Link href="/gates" className="transition hover:text-white">Gates</Link></li>
            <li><Link href="/#how" className="transition hover:text-white">How it works</Link></li>
            <li><Link href="/#faq" className="transition hover:text-white">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Privacy
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            <li>Addresses never persisted</li>
            <li>SHA-256 hashed IDs only</li>
            <li>Signed selective proofs</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Ecosystem
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            <li>Solana</li>
            <li>Helius RPC</li>
            <li>Solana Attestation Service</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ShadowRep — MVP. Not production.</p>
          <p>Built on Solana.</p>
        </div>
      </div>
    </footer>
  );
}
