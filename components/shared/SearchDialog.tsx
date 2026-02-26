"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { GraphSummary } from "@/lib/types";

interface SearchDialogProps {
  graphs: GraphSummary[];
}

export function SearchDialog({ graphs }: SearchDialogProps) {
  const [query, setQuery] = useState("");

  const result = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return graphs.slice(0, 8);
    return graphs.filter((item) =>
      [item.title, item.description, item.category, item.tags.join(" ")].join(" ").toLowerCase().includes(q),
    );
  }, [graphs, query]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search graph..."
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950"
      />
      <ul className="mt-3 space-y-2 text-sm">
        {result.map((item) => (
          <li key={`${item.category}-${item.slug}`}>
            <Link
              href={`/graph/${item.category}/${item.slug}`}
              className="block rounded-md border border-transparent px-2 py-1.5 hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-800 dark:hover:bg-slate-800"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
