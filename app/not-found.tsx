import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Graph not found</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        The graph may have been moved or does not exist in content.
      </p>
      <Link
        href="/explore"
        className="mt-4 inline-flex rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        Back to Explore
      </Link>
    </div>
  );
}
