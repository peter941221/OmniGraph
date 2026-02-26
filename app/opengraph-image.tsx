import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 20% -10%, #bae6fd 0%, #f8fafc 35%), linear-gradient(135deg, #f8fafc, #e2e8f0)",
          padding: 56,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            fontSize: 24,
            color: "#0369a1",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          OmniGraph
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 62, fontWeight: 800, color: "#0f172a" }}>AI Architecture, as Code</div>
          <div style={{ fontSize: 30, color: "#334155", maxWidth: "88%" }}>
            Mermaid diagrams + explanations + reusable prompts in one place.
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#0f172a", display: "flex", gap: 20 }}>
          <span>50+ Graphs</span>
          <span>•</span>
          <span>5 Categories</span>
          <span>•</span>
          <span>SSG</span>
        </div>
      </div>
    ),
    size,
  );
}
