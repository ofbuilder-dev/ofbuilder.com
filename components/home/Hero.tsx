"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

// Fan layout for the three hero phones: left, centre, right.
const FAN = [
  { x: "-78%", rotate: -9, y: 56, scale: 0.86, z: 0 },
  { x: "0%", rotate: 0, y: 0, scale: 1, z: 2 },
  { x: "78%", rotate: 9, y: 56, scale: 0.86, z: 1 },
];

export default function Hero({ playUrl, showcase, suites }: { playUrl: string; showcase: ShowcaseApp[]; suites: SuiteChip[] }) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const spread = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden px-5 pt-36 sm:pt-40">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#3d3d52] shadow-sm ring-1 ring-black/5 backdrop-blur"
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
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-7 text-[clamp(2.8rem,8.5vw,6.8rem)] font-extrabold leading-[0.92]"
        >
          Apps that help
          <br />
          you{" "}
          <span className="relative inline-flex min-w-[2.6em] justify-center align-bottom">
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[i].w}
                initial={{ y: "60%", opacity: 0, rotateX: -80 }}
                animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                exit={{ y: "-60%", opacity: 0, rotateX: 80 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
                style={{ color: WORDS[i].c }}
              >
                {WORDS[i].w}.
              </motion.span>
            </AnimatePresence>
            <motion.svg viewBox="0 0 300 20" className="absolute -bottom-2 left-0 w-full" aria-hidden>
              <motion.path
                d="M5 15 Q 75 2 150 12 T 295 8"
                fill="none"
                stroke={WORDS[i].c}
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                key={i}
              />
            </motion.svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[#3d3d52] sm:text-xl"
        >
          OfBuilder is an indie studio crafting bright, privacy-first apps for exams, citizenship, sleep, learning and money.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
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

        {/* suite chips */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.7 } } }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {suites.map((s) => (
            <motion.div key={s.id} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
              <Link
                href={`/suites/${s.id}/`}
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-[#3d3d52] ring-1 ring-black/5 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              >
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                {s.short}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* phone fan */}
      <motion.div style={{ y: lift }} className="relative mx-auto mt-14 h-[360px] max-w-5xl sm:h-[460px]">
        {showcase.slice(0, 3).map((a, idx) => {
          const f = FAN[idx];
          return (
            <motion.div
              key={a.slug}
              className="absolute left-1/2 top-0 -ml-[85px] w-[170px] sm:-ml-[120px] sm:w-[240px]"
              style={{ zIndex: f.z }}
              initial={{ opacity: 0, y: 160, rotate: 0, x: "0%", scale: 0.9 }}
              animate={{ opacity: 1, y: f.y, rotate: f.rotate, x: f.x, scale: f.scale }}
              transition={{ delay: 0.6 + idx * 0.12, type: "spring", stiffness: 70, damping: 16 }}
            >
              <motion.div style={{ scale: idx === 1 ? 1 : spread }} whileHover={{ y: -14 }} transition={{ type: "spring", stiffness: 200, damping: 18 }}>
                <Link href={`/${a.slug}/`} aria-label={a.name} className="block">
                  <PhoneFrame>
                    <ScreenMock screen={a.screen} theme={a.theme} name={a.name} icon={a.icon} />
                  </PhoneFrame>
                </Link>
              </motion.div>
            </motion.div>
          );
        })}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-[#fffbf5] to-transparent" />
      </motion.div>
    </section>
  );
}
