import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#06060c]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#6366F1]">
            <ShieldCheck className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-base font-bold tracking-tight">ShadowRep</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm text-slate-400">
          <Link
            href="/dashboard"
            className="hidden rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-white sm:block"
          >
            Dashboard
          </Link>
          <Link
            href="/gates"
            className="hidden rounded-full px-4 py-2 transition hover:bg-white/5 hover:text-white sm:block"
          >
            Gates
          </Link>
          <Link
            href="/dashboard"
            className="ml-2 rounded-full bg-white px-4 py-2 font-semibold text-black transition hover:bg-slate-200"
          >
            Open app
          </Link>
        </nav>
      </div>
    </header>
  );
}
