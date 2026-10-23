"use client";

import Link from "next/link";
import { BookOpen, Brain, Car, Earth, GraduationCap, Moon, Puzzle, ShieldCheck, Wallet, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";


const WORDS = [
  { w: "learn", c: "#ff6b6b" },
  { w: "pass", c: "#f59e0b" },
  { w: "sleep", c: "#8b5cf6" },
  { w: "grow", c: "#10b981" },
];

// Floating decorations around the headline: themed icon tiles (one per thing our apps help with) and soft shapes.
type Tile = { kind: "tile"; x: number; y: number; s: number; r: number; Icon: LucideIcon; from: string; to: string };
type Shape = { kind: "ring" | "dot" | "spark" | "pill"; x: number; y: number; s: number; r: number; c: string };
const FLOATERS: (Tile | Shape)[] = [
  { kind: "tile", x: 6, y: 20, s: 84, r: -10, Icon: GraduationCap, from: "#ff6b6b", to: "#ffb347" },
  { kind: "tile", x: 15, y: 52, s: 68, r: 8, Icon: Car, from: "#3b82f6", to: "#4cc9f0" },
  { kind: "tile", x: 5, y: 76, s: 74, r: -6, Icon: Earth, from: "#f97316", to: "#facc15" },
  { kind: "tile", x: 21, y: 12, s: 58, r: 6, Icon: Brain, from: "#14b8a6", to: "#8ee55e" },
  { kind: "tile", x: 86, y: 16, s: 80, r: 10, Icon: Moon, from: "#6366f1", to: "#c084fc" },
  { kind: "tile", x: 80, y: 46, s: 64, r: -8, Icon: ShieldCheck, from: "#8b5cf6", to: "#22d3ee" },
  { kind: "tile", x: 89, y: 72, s: 78, r: 6, Icon: Wallet, from: "#10b981", to: "#4cc9f0" },
  { kind: "tile", x: 74, y: 84, s: 58, r: -12, Icon: Puzzle, from: "#f59e0b", to: "#ff6b6b" },
  { kind: "tile", x: 26, y: 86, s: 54, r: 4, Icon: BookOpen, from: "#ec4899", to: "#f97316" },
  { kind: "ring", x: 70, y: 10, s: 46, r: 0, c: "#8b5cf6" },
  { kind: "ring", x: 30, y: 30, s: 26, r: 0, c: "#ff6b6b" },
  { kind: "dot", x: 92, y: 40, s: 18, r: 0, c: "#ffb347" },
  { kind: "dot", x: 11, y: 38, s: 14, r: 0, c: "#4cc9f0" },
  { kind: "dot", x: 62, y: 92, s: 16, r: 0, c: "#10b981" },
  { kind: "spark", x: 68, y: 28, s: 30, r: 0, c: "#f59e0b" },
  { kind: "spark", x: 34, y: 70, s: 24, r: 0, c: "#8b5cf6" },
  { kind: "pill", x: 94, y: 90, s: 60, r: -30, c: "#ff6b6b" },
  { kind: "pill", x: 2, y: 4, s: 54, r: 35, c: "#8ee55e" },
];

function Floater({ f }: { f: Tile | Shape }) {
  if (f.kind === "tile") {
    const { Icon } = f;
    return (
      <span
        className="relative grid place-items-center overflow-hidden shadow-[0_24px_48px_-16px_rgba(15,15,26,0.45)] ring-1 ring-white/40"
        style={{ width: f.s, height: f.s, borderRadius: f.s * 0.3, background: `linear-gradient(145deg, ${f.from}, ${f.to})` }}
      >
        <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent" />
        <Icon className="relative text-white drop-shadow" size={f.s * 0.46} strokeWidth={2.2} />
      </span>
    );
  }
  if (f.kind === "ring") return <span className="block rounded-full" style={{ width: f.s, height: f.s, border: `${Math.max(5, f.s / 7)}px solid ${f.c}`, opacity: 0.75 }} />;
  if (f.kind === "dot") return <span className="block rounded-full" style={{ width: f.s, height: f.s, background: f.c, boxShadow: `0 8px 20px -6px ${f.c}` }} />;
  if (f.kind === "pill") return <span className="block rounded-full" style={{ width: f.s, height: f.s * 0.34, background: f.c, opacity: 0.8 }} />;
  return (
    <svg width={f.s} height={f.s} viewBox="-20 -20 40 40" style={{ color: f.c }}>
      <path fill="currentColor" d="M0 -19c2.4 12.5 6.5 16.6 19 19-12.5 2.4-16.6 6.5-19 19-2.4-12.5-6.5-16.6-19-19 12.5-2.4 16.6-6.5 19-19z" />
    </svg>
  );
}

export default function Hero({ playUrl }: { playUrl: string }) {
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
      {/* floating decorations */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
        {FLOATERS.map((f, idx) => (
          <motion.div
            key={idx}
            className="absolute"
            style={{ left: `${f.x}%`, top: `${f.y}%`, x: idx % 2 ? px : pxInv, y: idx % 2 ? py : pyInv }}
            initial={{ opacity: 0, scale: 0.3, rotate: f.r * 3 }}
            animate={{ opacity: 1, scale: 1, rotate: f.r }}
            transition={{ delay: 0.3 + idx * 0.05, type: "spring", stiffness: 120, damping: 12 }}
          >
            <div className="animate-bob" style={{ animationDelay: `${-idx * 0.7}s`, animationDuration: `${4 + (idx % 4)}s`, ["--r" as string]: "0deg" }}>
              <Floater f={f} />
            </div>
          </motion.div>
        ))}
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

        {/* mobile tile row */}
        <div className="mt-12 flex justify-center gap-3 sm:hidden">
          {FLOATERS.filter((f): f is Tile => f.kind === "tile")
            .slice(0, 5)
            .map((f, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + idx * 0.08 }}>
                <Floater f={{ ...f, s: 52 }} />
              </motion.div>
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
