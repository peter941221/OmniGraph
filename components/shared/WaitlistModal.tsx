"use client";

interface WaitlistModalProps {
  feature: "export" | "fork";
  open: boolean;
  onClose: () => void;
}

export function WaitlistModal({ feature, open, onClose }: WaitlistModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Join waitlist: {feature}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Fake-door collection is wired in MVP. Real payment and account system come later.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}
