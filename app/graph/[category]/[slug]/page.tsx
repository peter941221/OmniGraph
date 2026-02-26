import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MermaidRenderer } from "@/components/graph/MermaidRenderer";
import { TabSwitcher } from "@/components/graph/TabSwitcher";
import { ZoomableCanvas } from "@/components/graph/ZoomableCanvas";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllGraphParams, getGraphBySlug } from "@/lib/content";
import { highlightMermaidCode } from "@/lib/shiki";

interface PageProps {
  params: {
    category: string;
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllGraphParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const graph = getGraphBySlug(params.category, params.slug);
  if (!graph) {
    return {
      title: "Graph not found · OmniGraph",
    };
  }

  const imageUrl = "/og/graph-og.svg";

  return {
    title: `${graph.frontmatter.title} - OmniGraph`,
    description: graph.frontmatter.description,
    openGraph: {
      title: graph.frontmatter.title,
      description: graph.frontmatter.description,
      images: [{ url: imageUrl }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: graph.frontmatter.title,
      description: graph.frontmatter.description,
      images: [imageUrl],
    },
  };
}

export default async function GraphPage({ params }: PageProps) {
  const graph = getGraphBySlug(params.category, params.slug);
  if (!graph) notFound();
  const highlightedCode = await highlightMermaidCode(graph.mermaidCode);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: graph.frontmatter.title,
    description: graph.frontmatter.description,
    datePublished: graph.frontmatter.date,
    dateModified: graph.frontmatter.updated ?? graph.frontmatter.date,
    author: {
      "@type": "Organization",
      name: graph.frontmatter.author,
    },
  };

  return (
    <div className="space-y-6">
      <JsonLd data={jsonLd} />
      <section className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-sky-700 dark:text-sky-300">
          {graph.frontmatter.category}
        </p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{graph.frontmatter.title}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">{graph.frontmatter.description}</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <ZoomableCanvas>
          <MermaidRenderer code={graph.mermaidCode} />
        </ZoomableCanvas>
        <TabSwitcher
          mermaidCode={graph.mermaidCode}
          highlightedCode={highlightedCode}
          explainContent={graph.explainContent}
          promptContent={graph.promptContent}
          slug={graph.frontmatter.slug}
        />
      </section>
    </div>
  );
}
