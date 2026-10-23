import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppNav from "@/components/app/AppNav";
import Faq from "@/components/app/Faq";
import Gallery from "@/components/app/Gallery";
import Motif from "@/components/app/Motif";
import PhoneShowcase from "@/components/app/PhoneShowcase";
import AppIcon from "@/components/ui/AppIcon";
import CountUp from "@/components/ui/CountUp";
import Icon from "@/components/ui/Icon";
import PlayBadge from "@/components/ui/PlayBadge";
import Reveal from "@/components/ui/Reveal";
import Tilt from "@/components/ui/Tilt";
import Logo from "@/components/site/Logo";
import Terminal from "@/components/app/Terminal";
import { apps, appsInSuite, contactEmail, getApp, getSuite } from "@/lib/apps";

export const dynamicParams = false;

export function generateStaticParams() {
  return apps.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const app = getApp((await params).slug);
  if (!app) return {};
  return {
    title: { absolute: `${app.name}: ${app.tagline}` },
    description: app.description[0],
    openGraph: { title: app.name, description: app.tagline, url: `https://ofbuilder.com/${app.slug}/`, images: [app.icon] },
    icons: { icon: app.icon, apple: app.icon },
  };
}

function Eyebrow({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color }}>
      {children}
    </p>
  );
}

export default async function AppPage({ params }: { params: Promise<{ slug: string }> }) {
  const app = getApp((await params).slug);
  if (!app) notFound();
  const suite = getSuite(app.suiteId)!;
  const { primary, secondary, soft, dark } = app.theme;
  const siblings = appsInSuite(app.suiteId).filter((a) => a.slug !== app.slug);
  const screenTheme = { primary, secondary, soft, dark };
  const heroText = dark ? "text-white" : "text-[#0f0f1a]";
  const heroSub = dark ? "text-white/75" : "text-[#3d3d52]";

  return (
    <div id="top" className="relative" style={{ ["--app" as string]: primary }}>
      <AppNav name={app.shortName} icon={app.icon} color={primary} playUrl={app.playUrl} darkHero={dark} />

      {/* ── Hero ── */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-32">
        <Motif app={app} />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <Reveal y={20}>
              <Link href={`/suites/${suite.id}/`} className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold backdrop-blur ${dark ? "bg-white/10 text-white ring-1 ring-white/20" : "bg-white/80 ring-1 ring-black/5"}`}>
                {suite.emoji} Part of the {suite.name}
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-7 flex items-center gap-5">
                <div className="animate-bob" style={{ ["--r" as string]: "-4deg" }}>
                  <AppIcon src={app.icon} name={app.shortName} size={96} />
                </div>
                {app.rating && (
                  <div className={heroText}>
                    <div className="text-xl tracking-widest text-amber-400">★★★★★</div>
                    <div className="text-sm font-semibold">{app.rating.toFixed(1)} on Google Play</div>
                  </div>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className={`font-display mt-6 text-[clamp(2.6rem,7vw,5.6rem)] font-extrabold leading-[0.95] ${heroText}`}>{app.shortName}</h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="font-display mt-4 text-2xl font-bold sm:text-3xl" style={{ color: dark ? secondary : primary }}>
                {app.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className={`mt-5 max-w-xl text-lg leading-relaxed ${heroSub}`}>{app.description[0]}</p>
            </Reveal>
            <Reveal delay={0.34} className="mt-9 flex flex-wrap items-center gap-3">
              <PlayBadge href={app.playUrl} dark={!dark} />
              <a href="#features" className={`inline-flex h-16 items-center rounded-2xl px-6 text-base font-semibold transition-transform hover:-translate-y-1 ${dark ? "bg-white/10 text-white ring-1 ring-white/20" : "bg-white ring-1 ring-black/10"}`}>
                Explore features ↓
              </a>
            </Reveal>
            {app.motif === "circuit" && (
              <Reveal delay={0.45} className="mt-8 hidden max-w-sm sm:block">
                <Terminal color={secondary} lines={[`$ ofb study --cert "${app.shortName}"`, "› loading objectives…  done", "› weak domain found → drilling", "› readiness: 87% ✓"]} />
              </Reveal>
            )}
          </div>
          <PhoneShowcase screens={app.screens} theme={screenTheme} name={app.shortName} icon={app.icon} />
        </div>
      </section>

      {/* ── Stats / overview ── */}
      <section className="relative px-5 py-24" style={{ background: soft }}>
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <Eyebrow color={primary}>Overview</Eyebrow>
            <h2 className="font-display mt-3 text-4xl font-extrabold sm:text-5xl">Why people choose {app.shortName}</h2>
            {app.description.slice(1).map((p, i) => (
              <p key={i} className="mt-4 text-lg leading-relaxed text-[#3d3d52]">
                {p}
              </p>
            ))}
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {app.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="flex h-full flex-col justify-between rounded-[2rem] bg-white p-6 shadow-[0_20px_50px_-25px_rgba(15,15,26,0.3)] ring-1 ring-black/5 transition-transform hover:-translate-y-2">
                  <div className="font-display text-4xl font-extrabold" style={{ color: i === 1 ? secondary : primary }}>
                    <CountUp value={s.value} />
                  </div>
                  <p className="mt-3 text-sm font-medium text-[#3d3d52]">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-28">
        <Reveal className="max-w-2xl">
          <Eyebrow color={primary}>Features</Eyebrow>
          <h2 className="font-display mt-3 text-4xl font-extrabold sm:text-6xl">Everything you need, nothing you don&apos;t.</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {app.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <Tilt className="h-full" max={7}>
                <div className="group relative h-full overflow-hidden rounded-[2rem] bg-white p-7 ring-1 ring-black/5 transition-shadow hover:shadow-2xl">
                  <div aria-hidden className="absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60" style={{ background: i % 2 ? secondary : primary }} />
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
                    <Icon name={f.icon} size={26} />
                  </span>
                  <h3 className="relative mt-6 text-xl font-bold">{f.title}</h3>
                  <p className="relative mt-2 leading-relaxed text-[#3d3d52]">{f.body}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Screens ── */}
      <section id="screens" className="relative scroll-mt-24 overflow-hidden py-24" style={{ background: dark ? "#0b0b1a" : soft, color: dark ? "#fff" : undefined }}>
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow color={dark ? secondary : primary}>Inside the app</Eyebrow>
              <h2 className="font-display mt-3 text-4xl font-extrabold sm:text-5xl">Take a look around.</h2>
            </div>
            <p className={`text-sm ${dark ? "text-white/60" : "text-[#6b6b80]"}`}>← Drag to explore →</p>
          </Reveal>
        </div>
        <Gallery screens={app.screens} theme={screenTheme} name={app.shortName} icon={app.icon} />
      </section>

      {/* ── How it works ── */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-28">
        <Reveal className="text-center">
          <Eyebrow color={primary}>How it works</Eyebrow>
          <h2 className="font-display mx-auto mt-3 max-w-2xl text-4xl font-extrabold sm:text-5xl">Three steps. That&apos;s it.</h2>
        </Reveal>
        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          <div aria-hidden className="absolute left-[16%] right-[16%] top-10 hidden h-1 rounded-full md:block" style={{ background: `linear-gradient(90deg, ${primary}, ${secondary})`, opacity: 0.3 }} />
          {app.howItWorks.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.15} className="relative text-center">
              <div className="font-display relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-white text-3xl font-extrabold shadow-xl ring-4 transition-transform hover:scale-110" style={{ color: primary, ["--tw-ring-color" as string]: soft }}>
                {i + 1}
              </div>
              <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs leading-relaxed text-[#3d3d52]">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="scroll-mt-24 px-5 py-24" style={{ background: soft }}>
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <Eyebrow color={primary}>Pricing</Eyebrow>
            <h2 className="font-display mt-3 text-4xl font-extrabold sm:text-5xl">Start free. Upgrade if you love it.</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[2rem] bg-white p-8 ring-1 ring-black/5">
                <h3 className="text-lg font-bold">Free</h3>
                <p className="font-display mt-2 text-5xl font-extrabold">$0</p>
                <ul className="mt-6 space-y-3">
                  {app.pricing.free.map((f) => (
                    <li key={f} className="flex gap-3 text-[#3d3d52]">
                      <span style={{ color: primary }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <PlayBadge href={app.playUrl} label="Download free on" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative h-full overflow-hidden rounded-[2rem] p-8 text-white shadow-2xl" style={{ background: `linear-gradient(140deg, ${primary}, ${secondary})` }}>
                <div aria-hidden className="dot-grid absolute inset-0 opacity-20" />
                <span className="relative rounded-full bg-white/20 px-3 py-1 text-xs font-bold">Most popular</span>
                <h3 className="relative mt-4 text-lg font-bold">Pro</h3>
                <p className="font-display relative mt-2 text-4xl font-extrabold">{app.pricing.proPrice ?? "In-app upgrade"}</p>
                <ul className="relative mt-6 space-y-3">
                  {app.pricing.pro.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span>★</span> {f}
                    </li>
                  ))}
                </ul>
                <p className="relative mt-8 text-sm text-white/80">Upgrade any time from inside the app. Current prices are shown on Google Play.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Reviews / rating ── */}
      {(app.reviews.length > 0 || app.rating) && (
        <section className="mx-auto max-w-6xl px-5 py-24">
          {app.reviews.length > 0 ? (
            <>
              <Reveal className="text-center">
                <Eyebrow color={primary}>Reviews</Eyebrow>
                <h2 className="font-display mt-3 text-4xl font-extrabold">Loved by our users</h2>
              </Reveal>
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {app.reviews.map((r, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <blockquote className="h-full rounded-[2rem] bg-white p-7 ring-1 ring-black/5">
                      <div className="text-amber-400">{"★".repeat(r.rating)}</div>
                      <p className="mt-3 leading-relaxed">“{r.text}”</p>
                      <footer className="mt-4 text-sm font-semibold text-[#6b6b80]">{r.name}</footer>
                    </blockquote>
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <Reveal>
              <div className="relative overflow-hidden rounded-[2.5rem] p-10 text-center text-white sm:p-16" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
                <div className="font-display text-7xl font-extrabold sm:text-8xl">
                  <CountUp value={app.rating!.toFixed(1)} />
                </div>
                <div className="mt-2 text-3xl tracking-[0.3em] text-amber-300">★★★★★</div>
                <p className="mt-4 text-lg font-semibold">Average rating on Google Play</p>
                <a href={app.playUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-bold text-[#0f0f1a] transition-transform hover:-translate-y-1">
                  Read reviews on Google Play ↗
                </a>
              </div>
            </Reveal>
          )}
        </section>
      )}

      {/* ── FAQ ── */}
      <section id="faq" className="mx-auto grid max-w-6xl scroll-mt-24 gap-12 px-5 py-24 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <Eyebrow color={primary}>FAQ</Eyebrow>
          <h2 className="font-display mt-3 text-4xl font-extrabold sm:text-5xl">Questions, answered.</h2>
          <p className="mt-4 text-[#3d3d52]">
            Still curious? Email{" "}
            <a href={`mailto:${contactEmail}?subject=${encodeURIComponent(app.shortName)}`} className="font-semibold underline" style={{ color: primary }}>
              {contactEmail}
            </a>
          </p>
        </Reveal>
        <Faq items={app.faq} color={primary} />
      </section>

      {/* ── Support & legal ── */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <Reveal>
          <div className="rounded-[2.5rem] bg-white p-8 ring-1 ring-black/5 sm:p-10">
            <h2 className="font-display text-3xl font-extrabold">Support & legal</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: "ShieldCheck", label: "Privacy policy", href: app.privacyUrl },
                app.termsUrl && { icon: "FileText", label: "Terms of use", href: app.termsUrl },
                app.deleteAccountUrl && { icon: "UserX", label: "Delete account & data", href: app.deleteAccountUrl },
                { icon: "Mail", label: "Email support", href: `mailto:${contactEmail}?subject=${encodeURIComponent(app.shortName + " support")}` },
                { icon: "Store", label: "Google Play listing", href: app.playUrl },
              ]
                .filter((x): x is { icon: string; label: string; href: string } => Boolean(x))
                .map((l) => (
                  <a key={l.label} href={l.href} className="group flex items-center gap-3 rounded-2xl p-4 transition-colors hover:bg-black/[0.03]" style={{ background: soft }}>
                    <span className="grid h-10 w-10 place-items-center rounded-xl text-white transition-transform group-hover:scale-110" style={{ background: primary }}>
                      <Icon name={l.icon} size={18} />
                    </span>
                    <span className="font-semibold">{l.label}</span>
                    <span className="ml-auto transition-transform group-hover:translate-x-1">→</span>
                  </a>
                ))}
            </div>
            {app.disclaimer && <p className="mt-6 text-xs text-[#6b6b80]">{app.disclaimer}</p>}
          </div>
        </Reveal>
      </section>

      {/* ── More from suite ── */}
      {siblings.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-extrabold">More from the {suite.name}</h2>
            <Link href={`/suites/${suite.id}/`} className="font-semibold" style={{ color: suite.color }}>
              View suite →
            </Link>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {siblings.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link href={`/${s.slug}/`} className="group flex flex-col items-center gap-3 rounded-3xl bg-white p-5 text-center ring-1 ring-black/5 transition-all hover:-translate-y-2 hover:shadow-xl">
                  <AppIcon src={s.icon} name={s.shortName} size={64} className="transition-transform group-hover:rotate-6" />
                  <span className="text-sm font-semibold">{s.shortName}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="px-5 pb-16">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] px-8 py-20 text-center text-white" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
            <div aria-hidden className="blob -left-20 -top-20 h-72 w-72 bg-white" style={{ opacity: 0.25 }} />
            <div className="relative mx-auto w-fit animate-bob">
              <AppIcon src={app.icon} name={app.shortName} size={88} />
            </div>
            <h2 className="font-display relative mt-6 text-4xl font-extrabold sm:text-6xl">Get {app.shortName} today.</h2>
            <p className="relative mx-auto mt-4 max-w-md text-lg text-white/85">{app.tagline}</p>
            <div className="relative mt-8 flex justify-center">
              <PlayBadge href={app.playUrl} dark={false} />
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-[#6b6b80] sm:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <span>Made with ♥ by</span> <Logo size={24} />
          </Link>
          <div className="flex flex-wrap gap-5">
            <Link href="/apps/" className="hover:text-[#0f0f1a]">All apps</Link>
            <a href={app.privacyUrl} className="hover:text-[#0f0f1a]">Privacy</a>
            <a href={`mailto:${contactEmail}`} className="hover:text-[#0f0f1a]">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
