"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

type IconItem = { slug: string; name: string; icon: string };

const WORDS = [
  { w: "learn", c: "#ff6b6b" },
  { w: "pass", c: "#f59e0b" },
  { w: "sleep", c: "#8b5cf6" },
  { w: "grow", c: "#10b981" },
];

// Positions (in % of the hero box) for the floating icons; mirrored left/right of the headline.
const SPOTS = [
  { x: 4, y: 18, s: 76, r: -10 },
  { x: 13, y: 48, s: 64, r: 8 },
  { x: 3, y: 74, s: 70, r: -4 },
  { x: 18, y: 84, s: 56, r: 12 },
  { x: 20, y: 10, s: 54, r: 6 },
  { x: 88, y: 14, s: 72, r: 10 },
  { x: 80, y: 42, s: 60, r: -8 },
  { x: 90, y: 66, s: 78, r: 6 },
  { x: 76, y: 82, s: 58, r: -12 },
  { x: 72, y: 8, s: 52, r: -6 },
  { x: 29, y: 92, s: 48, r: 4 },
  { x: 64, y: 93, s: 50, r: -4 },
];

export default function Hero({ icons, playUrl }: { icons: IconItem[]; playUrl: string }) {
  const [i, setI] = useState(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 15 });
  const sy = useSpring(my, { stiffness: 50, damping: 15 });
  const px = useTransform(sx, (v) => v * 30);
  const py = useTransform(sy, (v) => v * 30);
  const pxInv = useTransform(sx, (v) => v * -18);
  const pyInv = useTransform(sy, (v) => v * -18);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-20 pt-32"
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      {/* floating icons */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
        {SPOTS.map((p, idx) => {
          const app = icons[idx % icons.length];
          return (
            <motion.div
              key={idx}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%`, x: idx % 2 ? px : pxInv, y: idx % 2 ? py : pyInv }}
              initial={{ opacity: 0, scale: 0.3, rotate: p.r * 3 }}
              animate={{ opacity: 1, scale: 1, rotate: p.r }}
              transition={{ delay: 0.3 + idx * 0.07, type: "spring", stiffness: 120, damping: 12 }}
            >
              <div className="animate-bob" style={{ animationDelay: `${-idx * 0.7}s`, animationDuration: `${4 + (idx % 4)}s`, ["--r" as string]: `${p.r}deg` }}>
                <img
                  src={app.icon}
                  alt=""
                  width={p.s}
                  height={p.s}
                  className="shadow-[0_20px_40px_-12px_rgba(15,15,26,0.35)]"
                  style={{ width: p.s, height: p.s, borderRadius: p.s * 0.24 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

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
          className="font-display mt-7 text-[clamp(2.8rem,9vw,7.2rem)] font-extrabold leading-[0.92]"
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
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#0f0f1a] px-7 py-4 text-base font-semibold text-white shadow-xl shadow-black/20 transition-transform hover:-translate-y-1 active:scale-95"
          >
            <span className="bg-rainbow absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative">Explore all apps</span>
            <span className="relative transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <a
            href={playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-[#0f0f1a] shadow-lg ring-1 ring-black/5 transition-transform hover:-translate-y-1 active:scale-95"
          >
            ▶ View on Google Play
          </a>
        </motion.div>

        {/* mobile icon row */}
        <div className="mt-12 flex justify-center -space-x-3 sm:hidden">
          {icons.slice(0, 6).map((a, idx) => (
            <motion.img
              key={a.slug}
              src={a.icon}
              alt=""
              width={52}
              height={52}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + idx * 0.08 }}
              className="h-13 w-13 rounded-2xl ring-4 ring-[#fffbf5]"
            />
          ))}
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium text-[#6b6b80] sm:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll
        <span className="h-8 w-5 rounded-full border-2 border-[#6b6b80]/40 p-1">
          <span className="block h-2 w-full rounded-full bg-[#6b6b80]/60" />
        </span>
      </motion.div>
    </section>
  );
}
