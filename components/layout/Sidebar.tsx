import Link from "next/link";
import clsx from "clsx";

import { CATEGORIES } from "@/lib/types";

interface SidebarProps {
  activeCategory?: string;
  counts?: Record<string, number>;
}

export function Sidebar({ activeCategory, counts = {} }: SidebarProps) {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Categories</h2>
      <ul className="mt-3 space-y-2 text-sm">
        <li>
          <Link
            href="/explore"
            className={clsx(
              "flex items-center justify-between rounded-md px-2 py-1.5",
              activeCategory
                ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                : "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
            )}
          >
            <span>all</span>
            <span>{Object.values(counts).reduce((sum, value) => sum + value, 0)}</span>
          </Link>
        </li>
        {CATEGORIES.map((category) => (
          <li key={category}>
            <Link
              href={`/explore?category=${category}`}
              className={clsx(
                "flex items-center justify-between rounded-md px-2 py-1.5",
                activeCategory === category
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100",
              )}
            >
              <span>{category}</span>
              <span>{counts[category] ?? 0}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
