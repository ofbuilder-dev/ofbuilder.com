"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Screen } from "@/lib/apps";
import { PhoneFrame, ScreenMock, type ScreenTheme } from "@/components/app/ScreenMock";

export type ShowcaseApp = { slug: string; name: string; icon: string; theme: ScreenTheme; screen: Screen };
type SuiteChip = { id: string; short: string; emoji: string; color: string };

const WORDS = [
  { w: "learn", c: "#ff6b6b" },
  { w: "pass", c: "#f59e0b" },
  { w: "sleep", c: "#8b5cf6" },
  { w: "grow", c: "#10b981" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Glass({ children, className = "", delay = 0, float = 0 }: { children: React.ReactNode; className?: string; delay?: number; float?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.7, ease }}
      className={`absolute z-20 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5 + float, repeat: Infinity, ease: "easeInOut", delay: float }}
        className="rounded-2xl bg-white/85 p-3.5 shadow-[0_20px_50px_-20px_rgba(15,15,26,0.45)] ring-1 ring-white/60 backdrop-blur-xl"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Hero({ playUrl, showcase, suites }: { playUrl: string; showcase: ShowcaseApp[]; suites: SuiteChip[] }) {
  const [w, setW] = useState(0);
  const [s, setS] = useState(0);

  useEffect(() => {
    const a = setInterval(() => setW((n) => (n + 1) % WORDS.length), 2200);
    const b = setInterval(() => setS((n) => (n + 1) % showcase.length), 3200);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, [showcase.length]);

  const app = showcase[s];

  return (
    <section className="relative px-5 pb-20 pt-32 sm:pt-36 lg:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-10">
        {/* ── Copy ── */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#3d3d52] shadow-sm ring-1 ring-black/5 backdrop-blur"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            24 apps live on Google Play
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="font-display mt-7 text-[clamp(2.7rem,6.4vw,5.6rem)] font-extrabold leading-[0.95]"
          >
            Apps that help
            <br />
            you{" "}
            <span className="relative inline-block min-w-[2.7em] text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[w].w}
                  initial={{ y: "60%", opacity: 0, rotateX: -80 }}
                  animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                  exit={{ y: "-60%", opacity: 0, rotateX: 80 }}
                  transition={{ duration: 0.5, ease }}
                  className="inline-block"
                  style={{ color: WORDS[w].c }}
                >
                  {WORDS[w].w}.
                </motion.span>
              </AnimatePresence>
              <svg viewBox="0 0 300 20" className="absolute -bottom-2 left-0 w-[2.5em]" aria-hidden>
                <motion.path
                  key={w}
                  d="M5 15 Q 75 2 150 12 T 295 8"
                  fill="none"
                  stroke={WORDS[w].c}
                  strokeWidth="7"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-[#3d3d52] sm:text-xl lg:mx-0"
          >
            OfBuilder is an indie studio crafting bright, privacy-first apps for exams, citizenship, sleep, learning and money.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Link
              href="/apps/"
              className="group relative inline-flex h-14 items-center gap-2 overflow-hidden rounded-full bg-[#0f0f1a] px-7 text-base font-semibold text-white shadow-xl shadow-black/20 transition-transform hover:-translate-y-1 active:scale-95"
            >
              <span className="bg-rainbow absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative">Explore all apps</span>
              <span className="relative transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={playUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-[#0f0f1a] shadow-lg ring-1 ring-black/5 transition-transform hover:-translate-y-1 active:scale-95"
            >
              ▶ View on Google Play
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.6 } } }}
            className="mt-9 flex flex-wrap justify-center gap-2 lg:justify-start"
          >
            {suites.map((c) => (
              <motion.div key={c.id} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                <Link
                  href={`/suites/${c.id}/`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-sm font-semibold text-[#3d3d52] ring-1 ring-black/5 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                  {c.short}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Stage ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative mx-auto aspect-[1/1.02] w-full max-w-[540px]"
        >
          {/* gradient panel */}
          <div className="absolute inset-0 overflow-hidden rounded-[2.75rem] shadow-[0_40px_100px_-40px_rgba(124,92,255,0.6)]" style={{ background: "linear-gradient(140deg,#ff8a7a 0%,#ffb35c 30%,#a78bfa 68%,#60a5fa 100%)" }}>
            <div aria-hidden className="dot-grid absolute inset-0 opacity-40" />
            <div aria-hidden className="animate-spin-slow absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-white/30" />
            <div aria-hidden className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40" />
            <div aria-hidden className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 blur-2xl" />
          </div>

          {/* phone */}
          <div className="absolute left-1/2 top-1/2 z-10 w-[37%] -translate-x-1/2 -translate-y-1/2">
            <motion.div animate={{ y: [0, -10, 0], rotate: [-3, -1.5, -3] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
              <Link href={`/${app.slug}/`} aria-label={`Open ${app.name}`} className="block">
                <PhoneFrame>
                  <AnimatePresence mode="popLayout">
                    <motion.div key={app.slug} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5, ease }} className="absolute inset-0">
                      <ScreenMock screen={app.screen} theme={app.theme} name={app.name} icon={app.icon} />
                    </motion.div>
                  </AnimatePresence>
                </PhoneFrame>
              </Link>
            </motion.div>
          </div>

          {/* glass cards */}
          <Glass className="-left-1 top-[6%] w-52 origin-top-left scale-90 sm:-left-10 sm:top-[10%] sm:w-60 sm:scale-100" delay={0.7} float={0}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-lg text-white">✓</span>
              <div>
                <div className="text-sm font-bold text-[#0f0f1a]">Mock test passed</div>
                <div className="text-xs text-[#6b6b80]">47 / 50 · Driving Theory</div>
              </div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/5">
              <motion.div className="h-full rounded-full bg-emerald-500" initial={{ width: 0 }} animate={{ width: "94%" }} transition={{ delay: 1.1, duration: 1.4, ease }} />
            </div>
          </Glass>

          <Glass className="-right-1 bottom-[8%] w-40 origin-bottom-right scale-90 sm:-right-8 sm:bottom-auto sm:top-[38%] sm:w-48 sm:scale-100" delay={0.85} float={1.2}>
            <div className="text-xs font-semibold text-[#6b6b80]">DreamNest AI</div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-extrabold text-[#0f0f1a]">5.0</span>
              <span className="text-sm tracking-wider text-amber-400">★★★★★</span>
            </div>
            <div className="text-xs text-[#6b6b80]">on Google Play</div>
          </Glass>

          <Glass className="-left-2 bottom-[9%] hidden w-60 sm:-left-8 sm:block" delay={1} float={2.1}>
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 40 40" className="h-11 w-11 -rotate-90" aria-hidden>
                <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(15,15,26,.08)" strokeWidth="5" />
                <motion.circle cx="20" cy="20" r="16" fill="none" stroke="#7c5cff" strokeWidth="5" strokeLinecap="round" initial={{ strokeDasharray: "0 101" }} animate={{ strokeDasharray: "88 101" }} transition={{ delay: 1.3, duration: 1.4, ease }} />
              </svg>
              <div>
                <div className="text-sm font-bold text-[#0f0f1a]">Security+ readiness</div>
                <div className="text-xs text-[#6b6b80]">87% · 4 of 5 domains ready</div>
              </div>
            </div>
          </Glass>

          <Glass className="right-[6%] top-[3%] hidden sm:block" delay={1.15} float={0.6}>
            <div className="flex items-center gap-2 text-sm font-bold text-[#0f0f1a]">
              <span className="text-lg">🌍</span> 176 countries
            </div>
          </Glass>

          <Glass className="bottom-[2%] right-[8%] hidden sm:block" delay={1.3} float={1.7}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {showcase.map((a) => (
                  <img key={a.slug} src={a.icon} alt="" className="h-7 w-7 rounded-lg ring-2 ring-white" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#0f0f1a]">+20 more</span>
            </div>
          </Glass>
        </motion.div>
      </div>
    </section>
  );
}
