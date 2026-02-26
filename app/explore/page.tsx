import Link from "next/link";

import { getGraphSummaries } from "@/lib/content";

export default function ExplorePage() {
  const graphs = getGraphSummaries().sort((a, b) => {
    if (a.category === b.category) {
      return a.title.localeCompare(b.title);
    }
    return a.category.localeCompare(b.category);
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Explore</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {graphs.map((graph) => (
          <Link
            key={`${graph.category}-${graph.slug}`}
            href={`/graph/${graph.category}/${graph.slug}`}
            className="rounded-xl border border-slate-200 bg-white p-4 hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-sky-700 dark:text-sky-300">
              {graph.category}
            </p>
            <h2 className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">{graph.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{graph.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
