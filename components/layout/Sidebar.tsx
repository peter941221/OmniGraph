import Link from "next/link";

import { CATEGORIES } from "@/lib/types";

export function Sidebar() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Categories</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {CATEGORIES.map((category) => (
          <li key={category}>
            <Link
              href={`/explore?category=${category}`}
              className="block rounded-md px-2 py-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
