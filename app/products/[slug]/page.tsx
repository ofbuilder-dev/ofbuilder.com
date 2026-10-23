// Old /products/<slug>/ URLs redirect to the new per-app pages.
const REDIRECTS: Record<string, string> = {
  dreamnest: "/dreamnest/",
  sleepwise: "/sleepwise/",
  ilmai: "/ilmai/",
  passly: "/driving-theory/",
  mentalmath: "/mental-math/",
  renu: "/renu/",
  budgetwise: "/budgetwise/",
  muslimwise: "/#studio",
  lifewise: "/#studio",
  shishuai: "/#studio",
  sakinahfit: "/#studio",
  mindfulmuslim: "/#studio",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(REDIRECTS).map((slug) => ({ slug }));
}

export default async function ProductRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const to = REDIRECTS[(await params).slug] ?? "/apps/";
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <link rel="canonical" href={`https://ofbuilder.com${to}`} />
      <p style={{ padding: 40, fontFamily: "sans-serif" }}>
        This page has moved. <a href={to}>Continue →</a>
      </p>
    </>
  );
}
