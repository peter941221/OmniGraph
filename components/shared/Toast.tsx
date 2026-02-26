"use client";

interface ToastProps {
  message: string;
  tone?: "default" | "success" | "error";
}

export function Toast({ message, tone = "default" }: ToastProps) {
  const toneClass =
    tone === "success"
      ? "bg-emerald-600"
      : tone === "error"
        ? "bg-rose-600"
        : "bg-slate-900";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 right-4 z-50 rounded-md px-3 py-2 text-sm text-white shadow-lg ${toneClass}`}
    >
      {message}
    </div>
  );
}
