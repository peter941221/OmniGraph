import { CopyButton } from "@/components/shared/CopyButton";

interface PromptPanelProps {
  content: string;
}

export function PromptPanel({ content }: PromptPanelProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Prompt Template</h3>
        <CopyButton text={content} label="Copy Prompt" />
      </div>
      <pre className="max-h-[50vh] overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
        {content}
      </pre>
    </section>
  );
}
