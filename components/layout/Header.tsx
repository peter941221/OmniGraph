import Link from "next/link";

import { ThemeToggle } from "@/components/shared/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-sm font-bold tracking-wide text-slate-900 dark:text-slate-100">
          OmniGraph
        </Link>
        <nav className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          <Link href="/explore" className="hover:text-slate-900 dark:hover:text-slate-100">
            Explore
          </Link>
          <Link href="/about" className="hover:text-slate-900 dark:hover:text-slate-100">
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
