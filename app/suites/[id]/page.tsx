import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import AppIcon from "@/components/ui/AppIcon";
import Blobs from "@/components/ui/Blobs";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import Tilt from "@/components/ui/Tilt";
import { appsInSuite, getSuite, playDeveloperUrl, suites } from "@/lib/apps";

export const dynamicParams = false;

export function generateStaticParams() {
  return suites.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const suite = getSuite((await params).id);
  if (!suite) return {};
  return { title: suite.name, description: `${suite.tagline} ${suite.description}` };
}

export default async function SuitePage({ params }: { params: Promise<{ id: string }> }) {
  const suite = getSuite((await params).id);
  if (!suite) notFound();
  const list = appsInSuite(suite.id);
  const others = suites.filter((s) => s.id !== suite.id);

  return (
    <div className="relative">
      <Nav />

      <section className="relative overflow-hidden px-5 pb-20 pt-40" style={{ background: suite.soft }}>
        <Blobs colors={[suite.color, "#ffffff", suite.color, "#ffb347"]} opacity={0.35} />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm" style={{ color: suite.color }}>
              {suite.emoji} {list.length} {list.length === 1 ? "app" : "apps"} in this suite
              {suite.upcoming?.length ? ` · ${suite.upcoming.length} coming soon` : ""}
            </span>
            <h1 className="font-display mt-6 text-6xl font-extrabold leading-[0.95] sm:text-8xl">{suite.name}</h1>
            <p className="font-display mt-5 max-w-2xl text-2xl font-bold sm:text-3xl" style={{ color: suite.color }}>
              {suite.tagline}
            </p>
            <p className="mt-4 max-w-2xl text-lg text-[#3d3d52]">{suite.description}</p>
          </Reveal>
          <div className="mt-12 flex flex-wrap gap-4">
            {list.map((a, i) => (
              <Reveal key={a.slug} delay={0.1 + i * 0.06} y={40}>
                <Link href={`/${a.slug}/`} className="block transition-transform hover:-translate-y-2 hover:rotate-3">
                  <AppIcon src={a.icon} name={a.shortName} size={84} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.08}>
              <Tilt className="h-full" max={6}>
                <Link href={`/${a.slug}/`} className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-black/5 transition-shadow hover:shadow-2xl">
                  <div className="relative flex h-40 items-center justify-center overflow-hidden" style={{ background: a.theme.dark ? `radial-gradient(circle at 30% 20%, ${a.theme.primary}, #0b0b1a)` : a.theme.soft }}>
                    <div aria-hidden className="blob h-40 w-40" style={{ background: a.theme.secondary, opacity: 0.5 }} />
                    <AppIcon src={a.icon} name={a.shortName} size={88} className="relative transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl font-bold">{a.name}</h2>
                    <p className="mt-2 flex-1 text-[#3d3d52]">{a.tagline}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {a.stats.slice(0, 2).map((s) => (
                        <span key={s.label} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: a.theme.soft, color: a.theme.primary }}>
                          {s.value} {s.label}
                        </span>
                      ))}
                    </div>
                    <span className="mt-5 font-semibold" style={{ color: suite.color }}>
                      Open app site <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {suite.upcoming && suite.upcoming.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-24">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: suite.color }}>
              Coming soon
            </p>
            <h2 className="font-display mt-3 text-4xl font-extrabold sm:text-5xl">More {suite.short} apps on the way</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suite.upcoming.map((u, i) => (
              <Reveal key={u.name} delay={i * 0.08}>
                <div className="flex h-full items-center gap-4 rounded-[1.75rem] border-2 border-dashed bg-white/70 p-6" style={{ borderColor: suite.color + "55" }}>
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-3xl" style={{ background: suite.soft }}>
                    {u.emoji}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{u.name}</h3>
                    <p className="mt-1 text-sm text-[#6b6b80]">{u.note}</p>
                    <span className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold" style={{ background: suite.color + "1a", color: suite.color }}>
                      In development
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="px-5 py-24" style={{ background: suite.soft }}>
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-display text-4xl font-extrabold sm:text-5xl">Why {suite.name} works</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {suite.why.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.1}>
                <div className="group h-full rounded-[2rem] bg-white p-8 ring-1 ring-black/5 transition-transform hover:-translate-y-2">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:rotate-12" style={{ background: suite.color }}>
                    <Icon name={w.icon} size={26} />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{w.title}</h3>
                  <p className="mt-2 leading-relaxed text-[#3d3d52]">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal className="rounded-[3rem] p-12 text-center text-white" style={{ background: `linear-gradient(135deg, ${suite.color}, #0f0f1a)` }}>
          <h2 className="font-display text-4xl font-extrabold sm:text-5xl">Download from Google Play</h2>
          <p className="mx-auto mt-4 max-w-md text-white/80">Every app in the {suite.short} suite is free to download.</p>
          <a href={playDeveloperUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-bold text-[#0f0f1a] transition-transform hover:-translate-y-1">
            ▶ Open Google Play
          </a>
        </Reveal>
        <div className="mt-16">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#6b6b80]">Other suites</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <Link key={s.id} href={`/suites/${s.id}/`} className="flex items-center gap-3 rounded-2xl p-4 font-semibold transition-transform hover:-translate-y-1" style={{ background: s.soft }}>
                <span className="text-2xl">{s.emoji}</span> {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
