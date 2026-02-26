import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface GraphImageProps {
  params: {
    category: string;
    slug: string;
  };
}

export default function GraphOpenGraphImage({ params }: GraphImageProps) {
  const title = params.slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  const description = `Architecture map for ${params.category} · ${params.slug}`;
  const category = params.category;

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
            "radial-gradient(circle at 15% -20%, #93c5fd 0%, #f8fafc 35%), linear-gradient(135deg, #f8fafc, #dbeafe)",
          padding: 56,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#1d4ed8" }}>
          <span style={{ fontWeight: 700 }}>OmniGraph</span>
          <span style={{ textTransform: "uppercase" }}>{category}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 56, fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontSize: 28, color: "#334155", maxWidth: "90%" }}>{description}</div>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center", color: "#0f172a" }}>
          <span style={{ fontSize: 24 }}>Mermaid • Explain • Prompt</span>
        </div>
      </div>
    ),
    size,
  );
}
