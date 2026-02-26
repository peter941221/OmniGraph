export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">About OmniGraph</h1>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
        OmniGraph is a planning-first MVP for AI architecture visualization. The core principle is
        content-as-code: every graph is versioned in MDX and rendered statically for speed, SEO, and
        maintainability.
      </p>
      <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
        Current stage focuses on the read experience and conversion validation. Auth, editing,
        payments, and backend APIs are intentionally out of scope for MVP.
      </p>
    </div>
  );
}
