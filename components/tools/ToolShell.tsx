import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/site/JsonLd";
import AppIcon from "@/components/ui/AppIcon";
import Blobs from "@/components/ui/Blobs";
import { getApp } from "@/lib/apps";
import { breadcrumbLd } from "@/lib/seo";

// Frame for a free tool page: hero, the tool, a "practise for the exam" card and links to the other tools.
export default function ToolShell({
  path,
  name,
  eyebrow,
  title,
  intro,
  apps,
  children,
}: {
  path: string;
  name: string;
  eyebrow: string;
  title: string;
  intro: string;
  apps: string[];
  children: React.ReactNode;
}) {
  const related = apps.map((s) => getApp(s)).filter(Boolean) as NonNullable<ReturnType<typeof getApp>>[];
  return (
    <div className="relative">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Free IT tools", path: "/tools/" },
          { name, path },
        ])}
      />
      <Nav />
      <section className="relative overflow-hidden px-5 pb-10 pt-40">
        <Blobs colors={["#8b5cf6", "#4cc9f0", "#10b981", "#ff6b6b"]} opacity={0.3} fade />
        <div className="relative mx-auto max-w-4xl">
          <Link href="/tools/" className="text-sm font-semibold text-[#6b6b80] hover:text-[#0f0f1a]">
            ← All IT tools
          </Link>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#8b5cf6]">{eyebrow}</p>
          <h1 className="font-display mt-3 text-4xl font-extrabold leading-tight sm:text-6xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-[#3d3d52]">{intro}</p>
        </div>
      </section>
      <main className="mx-auto max-w-4xl px-5 pb-12">{children}</main>
      {related.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 pb-12">
          <div className="rounded-[2rem] bg-[#0f0f1a] p-6 text-white sm:p-10">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Practise for the exam, free</h2>
            <p className="mt-1 text-white/65">Take a free mini mock test, then get the full question bank in the app.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {related.map((a) => (
                <Link key={a.slug} href={`/${a.slug}/mock-test/`} className="flex items-center gap-4 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]">
                  <AppIcon src={a.icon} name={a.shortName} size={48} />
                  <span>
                    <span className="block font-bold">{a.shortName}</span>
                    <span className="text-sm text-white/60">Free mock test →</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
