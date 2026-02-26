import { Suspense } from "react";

import { ExploreClient } from "@/components/explore/ExploreClient";
import { getGraphSummaries } from "@/lib/content";

export default function ExplorePage() {
  const allGraphs = getGraphSummaries().sort((a, b) => {
    if (a.category === b.category) {
      return a.title.localeCompare(b.title);
    }
    return a.category.localeCompare(b.category);
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Explore</h1>
      <Suspense
        fallback={
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            Loading graphs...
          </div>
        }
      >
        <ExploreClient allGraphs={allGraphs} />
      </Suspense>
    </div>
  );
}
