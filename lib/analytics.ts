type EventName = "copy_code" | "click_export" | "click_fork" | "waitlist_submit";

interface EventProperties {
  slug?: string;
  category?: string;
  feature?: string;
  error?: string;
}

export function trackEvent(name: EventName, properties?: EventProperties) {
  if (typeof window === "undefined") return;

  const detail = {
    name,
    properties: properties ?? {},
    timestamp: new Date().toISOString(),
  };

  window.dispatchEvent(new CustomEvent("omnigraph:event", { detail }));

  const va = (window as Window & { va?: (...args: unknown[]) => void }).va;
  if (typeof va === "function") {
    va("event", { name, ...properties });
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${name}`, detail);
  }
}
