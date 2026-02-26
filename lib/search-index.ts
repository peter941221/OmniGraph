import { getGraphSummaries } from "@/lib/content";

export interface SearchIndexEntry {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  description: string;
}

export function getSearchIndex(): SearchIndexEntry[] {
  return getGraphSummaries().map((graph) => ({
    title: graph.title,
    slug: graph.slug,
    category: graph.category,
    tags: graph.tags,
    description: graph.description,
  }));
}
