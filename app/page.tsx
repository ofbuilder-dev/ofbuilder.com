import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import SiteFooter from "@/components/SiteFooter";
import {
  projects,
  playDeveloperUrl,
  facebookUrl,
  instagramUrl,
  linkedinUrl,
  youtubeUrl,
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
          {[...projects].sort((a, b) => (a.status === b.status ? 0 : a.status === "live" ? -1 : 1)).map((p) => (
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
            <div className="mt-8 flex items-center justify-center">
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#f5d76e] to-[#e8b923] px-8 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-.44.177-.861.494-1.171L12 13.09 23.506 4.286c.317.31.494.73.494 1.171z"/>
                </svg>
                Send us an email
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              {[
                { href: facebookUrl, label: "Facebook", d: "M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" },
                { href: instagramUrl, label: "Instagram", d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                { href: linkedinUrl, label: "LinkedIn", d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { href: youtubeUrl, label: "YouTube", d: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[var(--text-dim)] transition-colors hover:border-white/30 hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <SiteFooter />
    </div>
  );
}
