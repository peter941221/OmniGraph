import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { Providers } from "@/app/providers";
import { AnalyticsClient } from "@/components/analytics/AnalyticsClient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://omnigraph.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OmniGraph",
    template: "%s",
  },
  description: "Code-level visual map for modern AI architecture.",
  openGraph: {
    title: "OmniGraph",
    description: "Code-level visual map for modern AI architecture.",
    url: siteUrl,
    siteName: "OmniGraph",
    images: [{ url: "/og/site-og.svg" }],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniGraph",
    description: "Code-level visual map for modern AI architecture.",
    images: ["/og/site-og.svg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased`}>
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
          <Footer />
          <AnalyticsClient />
        </Providers>
      </body>
    </html>
  );
}
