"use client";

import { useEffect, useMemo, useState } from "react";
import mermaid from "mermaid";

interface MermaidRendererProps {
  code: string;
}

export function MermaidRenderer({ code }: MermaidRendererProps) {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");
  const renderId = useMemo(() => `mermaid-${Math.random().toString(36).slice(2)}`, []);

  useEffect(() => {
    let alive = true;

    async function render() {
      try {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "neutral",
        });
        const result = await mermaid.render(renderId, code);
        if (alive) {
          setSvg(result.svg);
          setError("");
        }
      } catch (err) {
        if (alive) {
          setError(err instanceof Error ? err.message : "Mermaid render failed.");
          setSvg("");
        }
      }
    }

    render();
    return () => {
      alive = false;
    };
  }, [code, renderId]);

  if (error) {
    return (
      <div className="rounded-md border border-rose-300 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
        {error}
      </div>
    );
  }

  return <div className="mermaid-wrapper" dangerouslySetInnerHTML={{ __html: svg }} />;
}
