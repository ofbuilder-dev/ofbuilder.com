"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";

const SECTIONS = [
  ["Features", "#features"],
  ["Screens", "#screens"],
  ["How it works", "#how"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
];

// Per-app navigation: makes each app page feel like its own site.
export default function AppNav({
  name,
  icon,
  color,
  playUrl,
  darkHero,
  base = "",
  practiceHref,
}: {
  name: string;
  icon: string;
  color: string;
  playUrl: string;
  darkHero?: boolean;
  base?: string; // app page path when used on a sub-page, so section links point back to it
  practiceHref?: string; // adds a "Free test" link for apps with web practice
}) {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));
  const light = darkHero && !solid;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div className="h-1 origin-left" style={{ scaleX: progress, background: color }} />
      <nav className={`mx-auto mt-3 flex max-w-7xl items-center justify-between gap-3 rounded-full px-4 py-3 transition-all duration-500 sm:px-6 ${solid ? "mx-3 bg-white/85 shadow-lg ring-1 ring-black/5 backdrop-blur-xl sm:mx-auto" : ""}`}>
        <a href={base ? base : "#top"} className="flex min-w-0 items-center gap-2.5 pl-1">
          <img src={icon} alt="" className="h-10 w-10 shrink-0 rounded-xl shadow sm:h-12 sm:w-12 sm:rounded-2xl" />
          <span className={`font-display truncate text-lg font-extrabold sm:text-2xl ${light ? "text-white" : "text-[#0f0f1a]"}`}>{name}</span>
        </a>
        <div className={`hidden items-center gap-1 text-[17px] font-semibold lg:flex ${light ? "text-white/80" : "text-[#3d3d52]"}`}>
          {practiceHref && (
            <a href={practiceHref} className="rounded-full px-4 py-2.5 font-bold" style={{ color: light ? "#fff" : color }}>
              Free test
            </a>
          )}
          {SECTIONS.map(([l, h]) => (
            <a key={h} href={`${base}${h}`} className={`rounded-full px-4 py-2.5 transition-colors ${light ? "hover:bg-white/10" : "hover:bg-black/5"}`}>
              {l}
            </a>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/" className={`hidden rounded-full px-3 py-2 text-sm font-semibold sm:block ${light ? "text-white/70 hover:text-white" : "text-[#6b6b80] hover:text-[#0f0f1a]"}`}>
            by OfBuilder
          </Link>
          <a href={playUrl} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95 sm:px-7 sm:py-3.5 sm:text-base" style={{ background: color }}>
            Get the app
          </a>
        </div>
      </nav>
    </header>
  );
}
