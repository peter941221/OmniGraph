type EventName = "waitlist_submit" | "copy_mermaid" | "open_graph";

interface EventProperties {
  slug?: string;
  category?: string;
  feature?: string;
}

export function trackEvent(name: EventName, properties?: EventProperties) {
  if (typeof window === "undefined") return;

  const va = (window as Window & { va?: (...args: unknown[]) => void }).va;
  if (typeof va === "function") {
    va("event", { name, ...properties });
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${name}`, properties);
  }
}
