"use client";

import { useTheme } from "next-themes";

import { CopyButton } from "@/components/shared/CopyButton";

interface CodePanelProps {
  code: string;
  highlighted: {
    lightHtml: string;
    darkHtml: string;
  };
  slug?: string;
}

export function CodePanel({ code, highlighted, slug }: CodePanelProps) {
  const { resolvedTheme } = useTheme();
  const html = resolvedTheme === "dark" ? highlighted.darkHtml : highlighted.lightHtml;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Mermaid Code</h3>
        <CopyButton text={code} slug={slug} />
      </div>
      <div
        className="shiki-frame max-h-[50vh] overflow-auto rounded-lg border border-slate-200 bg-white text-xs dark:border-slate-800 dark:bg-slate-950"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}
