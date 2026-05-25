import Link from "next/link";

export function Navbar() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <Link href="/" className="text-xl font-black tracking-tight">ShadowRep</Link>
      <nav className="flex items-center gap-4 text-sm text-slate-300">
        <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
        <Link href="/gates" className="hover:text-white">Gates</Link>
      </nav>
    </header>
  );
}
