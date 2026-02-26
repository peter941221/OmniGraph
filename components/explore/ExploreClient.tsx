"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { Sidebar } from "@/components/layout/Sidebar";
import type { GraphSummary } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

interface ExploreClientProps {
  allGraphs: GraphSummary[];
}

export function ExploreClient({ allGraphs }: ExploreClientProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const category = selectedCategory && CATEGORIES.includes(selectedCategory as (typeof CATEGORIES)[number])
    ? selectedCategory
    : undefined;

  const counts = useMemo(
    () =>
      allGraphs.reduce<Record<string, number>>((acc, graph) => {
        acc[graph.category] = (acc[graph.category] ?? 0) + 1;
        return acc;
      }, {}),
    [allGraphs],
  );

  const graphs = useMemo(
    () => (category ? allGraphs.filter((graph) => graph.category === category) : allGraphs),
    [allGraphs, category],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[230px_1fr]">
      <Sidebar activeCategory={category} counts={counts} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {graphs.map((graph) => (
          <Link
            key={`${graph.category}-${graph.slug}`}
            href={`/graph/${graph.category}/${graph.slug}`}
            prefetch={false}
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
  );
}
