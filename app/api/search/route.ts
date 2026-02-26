import { NextResponse } from "next/server";

import { getGraphSummaries } from "@/lib/content";

export function GET() {
  const data = getGraphSummaries().map((graph) => ({
    title: graph.title,
    slug: graph.slug,
    category: graph.category,
    tags: graph.tags,
    description: graph.description,
  }));

  return NextResponse.json(
    { items: data },
    {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
      },
    },
  );
}
