"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

import { Toast } from "@/components/shared/Toast";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { trackEvent } from "@/lib/analytics";

interface CopyButtonProps {
  text: string;
  label?: string;
  slug?: string;
}

export function CopyButton({ text, label = "Copy", slug }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();
  const [showToast, setShowToast] = useState(false);

  const onCopy = async () => {
    const ok = await copy(text);
    if (ok) {
      trackEvent("copy_code", { slug });
      setShowToast(true);
      window.setTimeout(() => setShowToast(false), 1200);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : label}
      </button>
      {showToast && <Toast message="已复制到剪贴板" tone="success" />}
    </>
  );
}
