"use client";

import { useState } from "react";
import clsx from "clsx";

import { CodePanel } from "@/components/graph/CodePanel";
import { ExplainPanel } from "@/components/graph/ExplainPanel";
import { PromptPanel } from "@/components/graph/PromptPanel";
import { WaitlistModal } from "@/components/shared/WaitlistModal";
import { trackEvent } from "@/lib/analytics";

interface TabSwitcherProps {
  mermaidCode: string;
  highlightedCode: {
    lightHtml: string;
    darkHtml: string;
  };
  explainContent: string;
  promptContent: string;
  slug?: string;
}

type GraphTab = "code" | "explain" | "prompt";

const TABS: GraphTab[] = ["code", "explain", "prompt"];

export function TabSwitcher({
  mermaidCode,
  highlightedCode,
  explainContent,
  promptContent,
  slug,
}: TabSwitcherProps) {
  const [tab, setTab] = useState<GraphTab>("code");
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [feature, setFeature] = useState<"export" | "fork">("export");

  const openWaitlist = (nextFeature: "export" | "fork") => {
    setFeature(nextFeature);
    setWaitlistOpen(true);
    trackEvent(nextFeature === "export" ? "click_export" : "click_fork", { feature: nextFeature, slug });
  };

  return (
    <>
      <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2">
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
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => openWaitlist("export")}
              className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Export
            </button>
            <button
              type="button"
              onClick={() => openWaitlist("fork")}
              className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Fork
            </button>
          </div>
        </div>

        {tab === "code" && <CodePanel code={mermaidCode} highlighted={highlightedCode} slug={slug} />}
        {tab === "explain" && <ExplainPanel content={explainContent} />}
        {tab === "prompt" && <PromptPanel content={promptContent} />}
      </section>

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} feature={feature} slug={slug} />
    </>
  );
}
