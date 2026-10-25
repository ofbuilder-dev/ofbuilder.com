/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Hero from "@/components/home/Hero";
import SuiteStack from "@/components/home/SuiteStack";
import Blobs from "@/components/ui/Blobs";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import Tilt from "@/components/ui/Tilt";
import Icon from "@/components/ui/Icon";
import AppIcon from "@/components/ui/AppIcon";
import { apps, appsInSuite, contactEmail, getApp, labApps, playDeveloperUrl, suites, type App } from "@/lib/apps";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const VALUES = [
  { icon: "Lock", title: "Privacy-first", body: "No bank linking, minimal data and clear policies for every app.", color: "#8b5cf6" },
  { icon: "WifiOff", title: "Works offline", body: "Study on the train or read stories on a plane. No signal needed.", color: "#4cc9f0" },
  { icon: "Sparkles", title: "AI where it helps", body: "Personal stories, sleep plans and sourced answers, never AI for show.", color: "#ff6b6b" },
  { icon: "HeartHandshake", title: "No dark patterns", body: "Fair pricing, one-time unlocks where we can and no tricks.", color: "#10b981" },
  { icon: "Rocket", title: "Shipped fast, polished often", body: "Small studio, quick updates, and we listen to every review.", color: "#f59e0b" },
];

function BentoCard({ app, className = "", big = false }: { app: App; className?: string; big?: boolean }) {
  const dark = app.theme.dark;
  return (
    <Tilt className={className} max={6}>
      <Link
        href={`/${app.slug}/`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] p-7 ring-1 ring-black/5 transition-shadow hover:shadow-2xl"
        style={{
          background: dark ? `radial-gradient(120% 120% at 0% 0%, ${app.theme.primary}, #0b0b1a 70%)` : app.theme.soft,
          color: dark ? "#fff" : "#0f0f1a",
        }}
      >
        <div aria-hidden className="blob -bottom-16 -right-16 h-56 w-56" style={{ background: app.theme.secondary, opacity: 0.45 }} />
        <div className="relative flex items-start justify-between">
          <AppIcon src={app.icon} name={app.shortName} size={big ? 84 : 64} className="transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
          {app.rating && (
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#0f0f1a]">★ {app.rating.toFixed(1)}</span>
          )}
        </div>
        <div className="relative mt-10">
          <h3 className={`font-display font-extrabold ${big ? "text-4xl sm:text-5xl" : "text-2xl"}`}>{app.shortName}</h3>
          <p className={`mt-2 ${big ? "max-w-sm text-lg" : "text-sm"} ${dark ? "text-white/75" : "text-[#3d3d52]"}`}>{app.tagline}</p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: dark ? app.theme.secondary : app.theme.primary }}>
            Visit app site <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </Tilt>
  );
}

export default function Home() {
  const suiteCards = suites.map((s) => ({
    ...s,
    apps: appsInSuite(s.id).map((a) => ({ slug: a.slug, shortName: a.shortName, icon: a.icon })),
  }));
  const half = Math.ceil(apps.length / 2);
  const rows = [apps.slice(0, half), apps.slice(half)];

  return (
    <div className="relative">
      <Nav />

      <div className="relative">
        <Blobs />
        <div aria-hidden className="dot-grid absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]" />
        <Hero playUrl={playDeveloperUrl} />
      </div>

      {/* Marquee */}
      <section aria-label="All apps" className="marquee-wrap relative -rotate-1 space-y-4 overflow-hidden border-y border-black/5 bg-white py-6">
        {rows.map((row, r) => (
          <div key={r} className={`marquee ${r ? "marquee-reverse" : ""}`}>
            {[...row, ...row].map((a, i) => (
              <Link key={i} href={`/${a.slug}/`} className="mx-2 flex shrink-0 items-center gap-3 rounded-full bg-[#fffbf5] py-2 pl-2 pr-5 ring-1 ring-black/5 transition-colors hover:bg-black/5">
                <img src={a.icon} alt="" width={36} height={36} className="h-9 w-9 rounded-xl" loading="lazy" />
                <span className="whitespace-nowrap text-sm font-semibold">{a.shortName}</span>
              </Link>
            ))}
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: "24", l: "apps live on Google Play", c: "#ff6b6b" },
            { v: "6", l: "focused product suites", c: "#f59e0b" },
            { v: "176", l: "countries reached", c: "#4cc9f0" },
            { v: "7", l: "citizenship tests covered", c: "#8b5cf6" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
              <div className="rounded-[2rem] bg-white p-8 ring-1 ring-black/5 transition-transform hover:-translate-y-1">
                <div className="font-display text-6xl font-extrabold" style={{ color: s.c }}>
                  <CountUp value={s.v} />
                </div>
                <p className="mt-2 font-medium text-[#3d3d52]">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Suites */}
      <section id="suites" className="mx-auto max-w-6xl px-5">
        <Reveal className="mb-14 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8b5cf6]">Six suites</p>
          <h2 className="font-display mt-3 text-5xl font-extrabold sm:text-6xl">
            One studio. <span className="text-rainbow">Six families</span> of apps.
          </h2>
          <p className="mt-4 text-lg text-[#3d3d52]">Related apps share one polished system, so switching from one to the next feels familiar.</p>
        </Reveal>
        <SuiteStack suites={suiteCards} />
      </section>

      {/* Bento */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff6b6b]">Featured</p>
            <h2 className="font-display mt-3 text-5xl font-extrabold">Every app has its own home.</h2>
            <p className="mt-4 text-lg text-[#3d3d52]">Tap any app to open its own mini-website, ready to share with friends, students or customers.</p>
          </div>
          <Link href="/apps/" className="rounded-full bg-[#0f0f1a] px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-1">
            See all 24 apps →
          </Link>
        </Reveal>
        <div className="grid auto-rows-[minmax(260px,auto)] gap-4 md:grid-cols-4">
          <BentoCard app={getApp("dreamnest")!} big className="md:col-span-2 md:row-span-2" />
          <BentoCard app={getApp("driving-theory")!} className="md:col-span-2" />
          <BentoCard app={getApp("sleepwise")!} />
          <BentoCard app={getApp("arrowgo")!} />
          <BentoCard app={getApp("mental-math")!} />
          <BentoCard app={getApp("security-plus")!} />
          <BentoCard app={getApp("renu")!} className="md:col-span-2" />
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden bg-[#0f0f1a] py-28 text-white">
        <Blobs colors={["#8b5cf6", "#ff6b6b", "#4cc9f0", "#10b981"]} opacity={0.25} />
        <div className="relative mx-auto max-w-6xl px-5">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8ee55e]">Why OfBuilder</p>
            <h2 className="font-display mt-3 text-5xl font-extrabold sm:text-6xl">Small studio. Big care.</h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="group h-full rounded-[1.75rem] bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur transition-all hover:-translate-y-2 hover:bg-white/10">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" style={{ background: v.color }}>
                    <Icon name={v.icon} size={22} color="#fff" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Studio */}
      <section id="studio" className="mx-auto grid max-w-6xl gap-12 px-5 py-28 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f59e0b]">The studio</p>
          <h2 className="font-display mt-3 text-5xl font-extrabold">Built by a tiny team that ships.</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-[#3d3d52]">
            <p>OfBuilder started with a simple idea: everyday apps should be beautiful, honest and genuinely helpful. No bloat, no tricks and no mandatory subscriptions.</p>
            <p>Today we run 24 apps across six suites, used in 176 countries, from people passing their citizenship test to parents settling their kids at bedtime.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/blog/" className="rounded-full bg-white px-6 py-3 font-semibold ring-1 ring-black/10 transition-transform hover:-translate-y-1">Read the blog</Link>
            <Link href="/contact/" className="rounded-full bg-[#0f0f1a] px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-1">Work with us</Link>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative rounded-[2.5rem] bg-white p-8 ring-1 ring-black/5">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#6b6b80]">In the lab 🧪</p>
            <ul className="mt-6 space-y-3">
              {labApps.map((l, i) => (
                <li key={l.name} className="flex items-center gap-4 rounded-2xl bg-[#fffbf5] p-4 ring-1 ring-black/5 transition-transform hover:translate-x-2" style={{ transitionDelay: `${i * 20}ms` }}>
                  <span className="text-3xl">{l.emoji}</span>
                  <span>
                    <span className="block font-bold">{l.name}</span>
                    <span className="block text-sm text-[#6b6b80]">{l.note}</span>
                  </span>
                  <span className="ml-auto rounded-full bg-[#8b5cf6]/10 px-3 py-1 text-xs font-semibold text-[#8b5cf6]">Coming soon</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="bg-rainbow relative overflow-hidden rounded-[3rem] px-8 py-20 text-center text-white shadow-2xl">
            <div aria-hidden className="dot-grid absolute inset-0 opacity-30" />
            <h2 className="font-display relative text-5xl font-extrabold sm:text-7xl">Find your next favourite app.</h2>
            <p className="relative mx-auto mt-5 max-w-lg text-lg text-white/90">All 24 OfBuilder apps are waiting for you on Google Play.</p>
            <div className="relative mt-10 flex flex-wrap justify-center gap-3">
              <a href={playDeveloperUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-8 py-4 font-bold text-[#0f0f1a] shadow-xl transition-transform hover:-translate-y-1 hover:scale-105">
                ▶ Open Google Play
              </a>
              <a href={`mailto:${contactEmail}`} className="rounded-full bg-[#0f0f1a]/80 px-8 py-4 font-bold text-white backdrop-blur transition-transform hover:-translate-y-1">
                Say hello
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
