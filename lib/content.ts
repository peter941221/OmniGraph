import fs from "node:fs";
import path from "node:path";

import { parseGraphFile } from "@/lib/mdx";
import type { Category, GraphDocument, GraphSummary } from "@/lib/types";

export const CONTENT_DIR = path.join(process.cwd(), "content");

function listMdxFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];

  const files: string[] = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...listMdxFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

export function getAllGraphs(): GraphDocument[] {
  return listMdxFiles(CONTENT_DIR).map((sourcePath) => parseGraphFile(sourcePath));
}

export function getGraphBySlug(category: string, slug: string): GraphDocument | null {
  const sourcePath = path.join(CONTENT_DIR, category, `${slug}.mdx`);
  if (!fs.existsSync(sourcePath)) return null;
  return parseGraphFile(sourcePath);
}

export function getAllGraphParams() {
  return getAllGraphs().map((graph) => ({
    category: graph.frontmatter.category,
    slug: graph.frontmatter.slug,
  }));
}

export function getGraphSummaries(): GraphSummary[] {
  return getAllGraphs().map((graph) => ({
    title: graph.frontmatter.title,
    slug: graph.frontmatter.slug,
    description: graph.frontmatter.description,
    category: graph.frontmatter.category,
    tags: graph.frontmatter.tags,
    difficulty: graph.frontmatter.difficulty,
    date: graph.frontmatter.date,
    updated: graph.frontmatter.updated,
  }));
}

export function getCategoryCounts() {
  const counts = new Map<Category, number>();
  for (const graph of getGraphSummaries()) {
    const current = counts.get(graph.category) ?? 0;
    counts.set(graph.category, current + 1);
  }
  return counts;
}
