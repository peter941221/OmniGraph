"use client";

import { useEffect, useMemo, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

import { mermaidThemeByMode } from "@/lib/mermaid-themes";

interface MermaidRendererProps {
  code: string;
}

export function MermaidRenderer({ code }: MermaidRendererProps) {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "dark" ? "dark" : "light";
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");
  const [rendering, setRendering] = useState(true);
  const [retryNonce, setRetryNonce] = useState(0);
  const renderId = useMemo(() => `mermaid-${Math.random().toString(36).slice(2)}`, []);

  useEffect(() => {
    let alive = true;

    async function render() {
      setRendering(true);
      try {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          ...mermaidThemeByMode[mode],
        });
        const result = await mermaid.render(`${renderId}-${mode}-${retryNonce}`, code);
        if (alive) {
          setSvg(result.svg);
          setError("");
        }
      } catch (err) {
        if (alive) {
          setError(err instanceof Error ? err.message : "Mermaid render failed.");
          setSvg("");
        }
      } finally {
        if (alive) setRendering(false);
      }
    }

    render();
    return () => {
      alive = false;
    };
  }, [code, mode, renderId, retryNonce]);

  if (error) {
    return (
      <div className="space-y-2 rounded-md border border-rose-300 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
        <p>Mermaid 渲染失败，请检查语法后重试。</p>
        <p className="text-xs opacity-80">{error}</p>
        <button
          type="button"
          onClick={() => setRetryNonce((value) => value + 1)}
          className="rounded-md border border-rose-400 px-2.5 py-1 text-xs hover:bg-rose-100 dark:border-rose-700 dark:hover:bg-rose-900/40"
        >
          重试渲染
        </button>
      </div>
    );
  }

  if (rendering) {
    return (
      <div className="flex h-full min-h-40 items-center justify-center text-sm text-slate-500 dark:text-slate-300">
        Rendering diagram...
      </div>
    );
  }

  return <div className="mermaid-wrapper" dangerouslySetInnerHTML={{ __html: svg }} />;
}
