import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition hover:opacity-90"
        >
          <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-acid via-cyber to-iris">
            <ShieldCheck className="h-4 w-4 text-black" strokeWidth={2.75} />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </span>
          <span className="font-display text-base font-extrabold tracking-tight">
            SHADOWREP
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/dashboard"
            className="hidden rounded-full px-4 py-2 text-slate-400 transition hover:bg-white/5 hover:text-acid sm:block"
          >
            Dashboard
          </Link>
          <Link
            href="/gates"
            className="hidden rounded-full px-4 py-2 text-slate-400 transition hover:bg-white/5 hover:text-acid sm:block"
          >
            Gates
          </Link>
          <Link href="/dashboard" className="btn-acid ml-2 text-xs">
            Open app
          </Link>
        </nav>
      </div>
    </header>
  );
}
