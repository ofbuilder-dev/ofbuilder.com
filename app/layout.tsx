import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "700", "800"],
});

const siteUrl = "https://ofbuilder.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OfBuilder: apps that help you learn, pass, sleep & grow",
    template: "%s · OfBuilder",
  },
  description:
    "OfBuilder is an indie app studio with 24 Android apps across citizenship and driving theory tests, CompTIA exam prep, kids learning and bedtime stories, Islamic apps, AI sleep, brain games and private money tools.",
  keywords: ["OfBuilder", "app studio", "citizenship test app", "driving theory test app", "CompTIA exam prep", "AI apps"],
  authors: [{ name: "OfBuilder" }],
  openGraph: {
    title: "OfBuilder: apps that help you learn, pass, sleep & grow",
    description: "24 thoughtfully built Android apps across 6 suites.",
    url: siteUrl,
    siteName: "OfBuilder",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "OfBuilder", description: "Apps that help you learn, pass, sleep & grow." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
