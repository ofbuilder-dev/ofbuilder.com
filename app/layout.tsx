import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/site/JsonLd";
import { ogImage, organizationLd, websiteLd } from "@/lib/seo";

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
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
  openGraph: {
    title: "OfBuilder: apps that help you learn, pass, sleep & grow",
    description: "24 thoughtfully built Android apps across 6 suites.",
    images: ogImage("home", "OfBuilder: apps that help you learn, pass, sleep & grow"),
    url: siteUrl,
    siteName: "OfBuilder",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "OfBuilder", description: "Apps that help you learn, pass, sleep & grow.", images: ["/og/home.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>
        <JsonLd data={[organizationLd(), websiteLd()]} />
        {children}
      </body>
    </html>
  );
}
