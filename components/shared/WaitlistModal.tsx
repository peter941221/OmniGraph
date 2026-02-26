"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import { Toast } from "@/components/shared/Toast";
import { trackEvent } from "@/lib/analytics";

interface WaitlistModalProps {
  feature: "export" | "fork";
  open: boolean;
  onClose: () => void;
  slug?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistModal({ feature, open, onClose, slug }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<"success" | "error" | null>(null);
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  const title = useMemo(() => (feature === "export" ? "导出无水印图谱" : "Fork 到你的私有库"), [feature]);

  useEffect(() => {
    if (!open) {
      // Modal close should reset all fields for next open.
      setEmail("");
      setSubmitting(false);
      setSubmitted(false);
      setError("");
      setToast(null);
    }
  }, [open]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitted || submitting) return;

    const normalizedEmail = email.trim();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setError("请输入有效邮箱地址");
      return;
    }

    if (!formspreeId) {
      setError("缺少 NEXT_PUBLIC_FORMSPREE_ID 环境变量");
      setToast("error");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          feature,
          source_graph: slug ?? "unknown",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Formspree response ${response.status}`);
      }

      setSubmitted(true);
      setToast("success");
      trackEvent("waitlist_submit", { feature, slug });
    } catch (requestError) {
      setError("提交失败，请稍后重试");
      setToast("error");
      trackEvent("waitlist_submit", {
        feature,
        slug,
        error: requestError instanceof Error ? requestError.message : "unknown",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          MVP 阶段通过 Fake Door 验证需求。提交邮箱后会优先通知内测资格。
        </p>

        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950"
            />
          </label>
          {error ? <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p> : null}
          {submitted ? (
            <p className="text-xs text-emerald-600 dark:text-emerald-400">感谢订阅！你已加入候补名单。</p>
          ) : null}

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={submitted || submitting}
              className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900"
            >
              {submitted ? "已提交" : submitting ? "提交中..." : "加入候补"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              关闭
            </button>
          </div>
        </form>
      </div>
      {toast === "success" && <Toast message="提交成功" tone="success" />}
      {toast === "error" && <Toast message="提交失败，请重试" tone="error" />}
    </div>
  );
}
