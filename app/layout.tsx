import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const siteUrl = "https://ofbuilder.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "OfBuilder — A studio building useful apps people love",
  description:
    "OfBuilder is an indie software studio shipping AI-powered mobile apps across education, health, parenting and productivity. Explore our products.",
  keywords: [
    "OfBuilder",
    "app studio",
    "indie SaaS",
    "Flutter apps",
    "AI apps",
    "mobile apps",
  ],
  authors: [{ name: "OfBuilder" }],
  openGraph: {
    title: "OfBuilder — A studio building useful apps people love",
    description:
      "AI-powered mobile apps across education, health, parenting and productivity.",
    url: siteUrl,
    siteName: "OfBuilder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OfBuilder",
    description: "A studio building useful apps people love.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
