import Link from "next/link";

import { Sidebar } from "@/components/layout/Sidebar";
import { getGraphSummaries } from "@/lib/content";
import { CATEGORIES } from "@/lib/types";

interface ExplorePageProps {
  searchParams?: {
    category?: string;
  };
}

export default function ExplorePage({ searchParams }: ExplorePageProps) {
  const selectedCategory =
    searchParams?.category && CATEGORIES.includes(searchParams.category as (typeof CATEGORIES)[number])
      ? searchParams.category
      : undefined;

  const allGraphs = getGraphSummaries().sort((a, b) => {
    if (a.category === b.category) {
      return a.title.localeCompare(b.title);
    }
    return a.category.localeCompare(b.category);
  });

  const graphs = selectedCategory ? allGraphs.filter((graph) => graph.category === selectedCategory) : allGraphs;
  const counts = allGraphs.reduce<Record<string, number>>((acc, graph) => {
    acc[graph.category] = (acc[graph.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Explore</h1>
      <div className="grid gap-4 lg:grid-cols-[230px_1fr]">
        <Sidebar activeCategory={selectedCategory} counts={counts} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
          {graphs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              当前分类还没有内容，先去看看其它分类。
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
