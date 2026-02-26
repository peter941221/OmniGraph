import Link from "next/link";

import { getCategoryCounts, getGraphSummaries } from "@/lib/content";

export default function HomePage() {
  const graphs = getGraphSummaries()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 9);
  const categoryCounts = Object.fromEntries(getCategoryCounts());

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-sky-50 to-cyan-100 p-6 dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">OmniGraph MVP</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          把 AI 架构拆成可读、可复制、可复用的图谱
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-700 dark:text-slate-300">
          内容即代码，图谱即文档。每张图包含 Mermaid、解析、可复用 Prompt，帮助你从理解走向落地。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <Link
              key={category}
              href={`/explore?category=${category}`}
              prefetch={false}
              className="rounded-full border border-sky-200 bg-white/70 px-3 py-1 text-xs text-sky-800 hover:bg-white dark:border-sky-800 dark:bg-slate-900/70 dark:text-sky-300"
            >
              {category} ({count})
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {graphs.map((graph) => (
          <Link
            key={`${graph.category}-${graph.slug}`}
            href={`/graph/${graph.category}/${graph.slug}`}
            prefetch={false}
            className="rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-sky-700 dark:text-sky-300">
              {graph.category}
            </p>
            <h2 className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{graph.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{graph.description}</p>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              {graph.difficulty} · {graph.date}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
