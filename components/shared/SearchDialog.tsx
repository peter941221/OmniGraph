"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import type { GraphSummary } from "@/lib/types";

interface SearchDialogProps {
  graphs: GraphSummary[];
}

export function SearchDialog({ graphs }: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const result = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return graphs.slice(0, 12);
    return graphs.filter((item) =>
      [item.title, item.description, item.category, item.tags.join(" ")].join(" ").toLowerCase().includes(q),
    );
  }, [graphs, query]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isHotkey = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isHotkey) {
        event.preventDefault();
        setOpen((value) => !value);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <Search size={13} />
        <span>⌘K</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 p-4 pt-[14vh]">
          <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索标题 / 分类 / 标签..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950"
            />
            <ul className="mt-3 max-h-[48vh] space-y-2 overflow-auto text-sm">
              {result.length === 0 ? (
                <li className="rounded-md px-2 py-3 text-slate-500 dark:text-slate-400">没有匹配结果</li>
              ) : (
                result.map((item) => (
                  <li key={`${item.category}-${item.slug}`}>
                    <Link
                      href={`/graph/${item.category}/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-md border border-transparent px-2 py-2 hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-800 dark:hover:bg-slate-800"
                    >
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.category} · {item.tags.join(" / ")}
                      </p>
                    </Link>
                  </li>
                ))
              )}
            </ul>
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
