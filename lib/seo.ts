// Shared SEO helpers: absolute URLs, canonical paths and schema.org JSON-LD builders.
import { contactEmail, playDeveloperUrl, socials, type App, type Faq, type Suite } from "./apps";

export const siteUrl = "https://ofbuilder.com";
export const siteName = "OfBuilder";

/** Open Graph image entry for a generated /og/<name>.png file. */
export function ogImage(name: string, alt: string) {
  return [{ url: `/og/${name}.png`, width: 1200, height: 630, alt }];
}

/** Absolute URL for a site path, always with a trailing slash (the site is exported with trailingSlash). */
export function abs(path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${p.endsWith("/") ? p : `${p}/`}`;
}

// schema.org applicationCategory per app (defaults by suite).
const CATEGORY_BY_SLUG: Record<string, string> = {
  dreamnest: "LifestyleApplication",
  sleepwise: "HealthApplication",
  ilmai: "ReferenceApplication",
  "mental-math": "GameApplication",
  arrowgo: "GameApplication",
  renu: "FinanceApplication",
  budgetwise: "FinanceApplication",
};

export function appCategory(app: App) {
  return CATEGORY_BY_SLUG[app.slug] ?? "EducationalApplication";
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: abs("/"),
    logo: `${siteUrl}/brand/ofbuilder-mark-1024.png`,
    email: contactEmail,
    sameAs: [...Object.values(socials), playDeveloperUrl],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: abs("/"),
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function appLd(app: App) {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: app.name,
    description: app.description.join(" "),
    url: abs(`/${app.slug}/`),
    image: `${siteUrl}${app.icon}`,
    operatingSystem: "ANDROID",
    applicationCategory: appCategory(app),
    installUrl: app.playUrl,
    downloadUrl: app.playUrl,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function faqLd(faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function suiteLd(suite: Suite, list: App[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: suite.name,
    description: suite.description,
    url: abs(`/suites/${suite.id}/`),
    itemListElement: list.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/${a.slug}/`), name: a.name })),
  };
}
