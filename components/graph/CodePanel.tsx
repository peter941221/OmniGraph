import { CopyButton } from "@/components/shared/CopyButton";

interface CodePanelProps {
  code: string;
  slug?: string;
}

export function CodePanel({ code, slug }: CodePanelProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Mermaid Code</h3>
        <CopyButton text={code} slug={slug} />
      </div>
      <pre className="max-h-[50vh] overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
        <code>{code}</code>
      </pre>
    </section>
  );
}
