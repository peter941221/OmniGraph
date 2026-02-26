import fs from "node:fs";
import matter from "gray-matter";

import type { GraphDocument, GraphFrontmatter } from "@/lib/types";

function extractTagBlock(content: string, tag: "Mermaid" | "Explain" | "Prompt") {
  const matcher = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`);
  const match = content.match(matcher);
  return match ? match[1].trim() : "";
}

export function parseGraphFile(sourcePath: string): GraphDocument {
  const raw = fs.readFileSync(sourcePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data as GraphFrontmatter,
    mermaidCode: extractTagBlock(content, "Mermaid"),
    explainContent: extractTagBlock(content, "Explain"),
    promptContent: extractTagBlock(content, "Prompt"),
    sourcePath,
  };
}
