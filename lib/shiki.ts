import { createHighlighter, type HighlighterGeneric } from "shiki";

let highlighterPromise: Promise<HighlighterGeneric<"mermaid", "github-light" | "github-dark">> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      langs: ["mermaid"],
      themes: ["github-light", "github-dark"],
    });
  }
  return highlighterPromise;
}

export async function highlightMermaidCode(code: string) {
  const highlighter = await getHighlighter();

  return {
    lightHtml: highlighter.codeToHtml(code, {
      lang: "mermaid",
      theme: "github-light",
    }),
    darkHtml: highlighter.codeToHtml(code, {
      lang: "mermaid",
      theme: "github-dark",
    }),
  };
}
