"use client";

import { Analytics } from "@vercel/analytics/next";

import { EventDebugPanel } from "@/components/analytics/EventDebugPanel";

export function AnalyticsClient() {
  const isDev = process.env.NODE_ENV === "development";
  const analyticsEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";

  if (!analyticsEnabled && !isDev) {
    return null;
  }

  return (
    <>
      <Analytics mode={isDev ? "development" : "production"} debug={isDev} />
      {isDev ? <EventDebugPanel /> : null}
    </>
  );
}
