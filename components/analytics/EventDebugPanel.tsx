"use client";

import { useEffect, useState } from "react";

interface DebugEvent {
  name: string;
  properties: Record<string, unknown>;
  timestamp: string;
}

const STORAGE_KEY = "omnigraph:events";

export function EventDebugPanel() {
  const [events, setEvents] = useState<DebugEvent[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setEvents(JSON.parse(raw) as DebugEvent[]);
      }
    } catch {
      // ignore localStorage parse failures
    }

    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<DebugEvent>;
      setEvents((prev) => {
        const next = [customEvent.detail, ...prev].slice(0, 40);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    };

    window.addEventListener("omnigraph:event", handler as EventListener);
    return () => {
      window.removeEventListener("omnigraph:event", handler as EventListener);
    };
  }, []);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800 shadow-sm"
        >
          Events ({events.length})
        </button>
      ) : (
        <div className="w-[340px] rounded-lg border border-slate-300 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
              Analytics Events
            </h3>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setEvents([]);
                  window.localStorage.removeItem(STORAGE_KEY);
                }}
                className="rounded border border-slate-300 px-2 py-0.5 text-[11px] hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded border border-slate-300 px-2 py-0.5 text-[11px] hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
          <ul className="max-h-72 space-y-2 overflow-auto text-[11px]">
            {events.length === 0 ? (
              <li className="rounded-md border border-dashed border-slate-300 p-2 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                No events yet.
              </li>
            ) : (
              events.map((item, index) => (
                <li key={`${item.timestamp}-${item.name}-${index}`} className="rounded-md border border-slate-200 p-2 dark:border-slate-700">
                  <p className="font-medium text-slate-800 dark:text-slate-100">{item.name}</p>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">{item.timestamp}</p>
                  <pre className="mt-1 overflow-x-auto whitespace-pre-wrap text-slate-600 dark:text-slate-300">
                    {JSON.stringify(item.properties)}
                  </pre>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
