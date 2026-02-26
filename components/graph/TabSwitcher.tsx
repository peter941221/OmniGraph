"use client";

import { useState } from "react";
import clsx from "clsx";

import { CodePanel } from "@/components/graph/CodePanel";
import { ExplainPanel } from "@/components/graph/ExplainPanel";
import { PromptPanel } from "@/components/graph/PromptPanel";

interface TabSwitcherProps {
  mermaidCode: string;
  explainContent: string;
  promptContent: string;
  slug?: string;
}

type GraphTab = "code" | "explain" | "prompt";

const TABS: GraphTab[] = ["code", "explain", "prompt"];

export function TabSwitcher({ mermaidCode, explainContent, promptContent, slug }: TabSwitcherProps) {
  const [tab, setTab] = useState<GraphTab>("code");

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex gap-2">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={clsx(
              "rounded-md px-3 py-1.5 text-xs font-medium",
              tab === item
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "code" && <CodePanel code={mermaidCode} slug={slug} />}
      {tab === "explain" && <ExplainPanel content={explainContent} />}
      {tab === "prompt" && <PromptPanel content={promptContent} />}
    </section>
  );
}
