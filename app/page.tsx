import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import SiteFooter from "@/components/SiteFooter";
import {
  projects,
  playDeveloperUrl,
  facebookUrl,
  contactEmail,
} from "@/lib/projects";

const liveCount = projects.filter((p) => p.status === "live").length;

const stats = [
  { value: `${projects.length}`, label: "Products built" },
  { value: `${liveCount}`, label: "Live on Google Play" },
  { value: "6", label: "AI-powered apps" },
  { value: "100%", label: "Shipped solo" },
];

const principles = [
  {
    title: "Useful over flashy",
    body: "Every app solves a real, specific problem for a real person — not a feature list chasing a trend.",
    icon: "🎯",
  },
  {
    title: "AI where it earns its place",
    body: "We use AI to make products genuinely smarter — tutoring, personalization, answers — never as a gimmick.",
    icon: "✨",
  },
  {
    title: "Ship, learn, iterate",
    body: "Small bets, real users, fast feedback. We validate ideas in the market instead of guessing in a doc.",
    icon: "🚀",
  },
  {
    title: "Crafted, not cobbled",
    body: "Clean architecture, polished UI, and a consistent quality bar across every product we put our name on.",
    icon: "💎",
  },
];

export default function Home() {
  return (
    <div id="top" className="relative">
      <Navbar />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-aurora pt-16">
        <div aria-hidden className="absolute inset-0 grid-mask" />
        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-20 sm:pt-28">
          <div className="reveal mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-[var(--text-dim)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Independent software studio
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              We build useful apps
              <br />
              <span className="text-gradient">people actually love.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--text-dim)] sm:text-lg">
              OfBuilder is an indie studio shipping AI-powered mobile products
              across education, health, parenting and productivity — one focused
              app at a time.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#products"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#f5d76e] to-[#e8b923] px-6 py-3 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(232,185,35,0.25)] transition-transform hover:scale-[1.02] sm:w-auto"
              >
                Explore our products
              </a>
              <a
                href={playDeveloperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10 sm:w-auto"
              >
                View on Google Play
              </a>
            </div>
          </div>

          {/* stats */}
          <div className="reveal mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-[var(--bg)] px-5 py-6 text-center"
              >
                <div className="text-3xl font-semibold tracking-tight">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-[var(--text-faint)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Products ===== */}
      <section id="products" className="relative mx-auto max-w-6xl px-5 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[var(--brand)]">Our products</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            A growing portfolio of focused apps
          </h2>
          <p className="mt-3 text-[var(--text-dim)]">
            Each product is a standalone bet — built, shipped, and refined for a
            specific audience. Tap into any one below.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* ===== About / Principles ===== */}
      <section
        id="about"
        className="relative border-y border-white/10 bg-[var(--bg-soft)]"
      >
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-sm font-medium text-[var(--brand)]">
                How we build
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                A small studio with a high bar.
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--text-dim)]">
                OfBuilder is the home for a portfolio of independent software
                products. We design, build and ship each one end-to-end — from
                the first sketch to the store listing — with a shared foundation
                of clean code and thoughtful design.
              </p>
              <p className="mt-4 leading-relaxed text-[var(--text-dim)]">
                The goal is simple: build software that earns a place on
                someone&apos;s home screen and keeps it.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {principles.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-white/10 bg-[var(--panel)] p-6"
                >
                  <div className="text-2xl">{p.icon}</div>
                  <h3 className="mt-3 font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-dim)]">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Contact / CTA ===== */}
      <section id="contact" className="relative mx-auto max-w-6xl px-5 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#12101f] to-[#0a0a12] px-6 py-16 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#e8b923] opacity-20 blur-3xl"
          />
          <div className="relative mx-auto max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Have an idea, or want to collaborate?
            </h2>
            <p className="mt-3 text-[var(--text-dim)]">
              Whether it&apos;s feedback on an app, a partnership, or a project
              you want built — the inbox is open.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-b from-[#f5d76e] to-[#e8b923] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] sm:w-auto"
              >
                {contactEmail}
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10 sm:w-auto"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <SiteFooter />
    </div>
  );
}
