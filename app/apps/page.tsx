import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Directory from "@/components/home/Directory";
import Blobs from "@/components/ui/Blobs";
import Reveal from "@/components/ui/Reveal";
import { apps, suites } from "@/lib/apps";

export const metadata: Metadata = {
  title: "All apps",
  description: "Browse all 24 OfBuilder apps: citizenship tests, UK driving theory, CompTIA exam prep, AI sleep and wellness, learning games and money tools.",
};

export default function AppsPage() {
  const items = apps.map((a) => ({
    slug: a.slug,
    name: a.name,
    shortName: a.shortName,
    tagline: a.tagline,
    icon: a.icon,
    suiteId: a.suiteId,
    primary: a.theme.primary,
    soft: a.theme.soft,
    rating: a.rating,
  }));
  const chips = suites.map((s) => ({ id: s.id, short: s.short, emoji: s.emoji, color: s.color }));

  return (
    <div className="relative">
      <Nav />
      <section className="relative overflow-hidden px-5 pb-16 pt-40">
        <Blobs opacity={0.35} />
        <Reveal className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8b5cf6]">The collection</p>
          <h1 className="font-display mt-3 text-6xl font-extrabold sm:text-8xl">
            All <span className="text-rainbow">{apps.length}</span> apps.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#3d3d52]">Every app has its own page. Filter by suite, search by name, and share the link with anyone.</p>
        </Reveal>
      </section>
      <section className="mx-auto max-w-6xl px-5">
        <Directory items={items} suites={chips} />
      </section>
      <Footer />
    </div>
  );
}
