"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type SuiteCard = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  soft: string;
  emoji: string;
  apps: { slug: string; shortName: string; icon: string }[];
  upcoming?: { name: string; emoji: string; note: string }[];
};

// Cards stick to the top and shrink slightly as the next one slides over them.
function Card({ s, index, total }: { s: SuiteCard; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.03]);

  return (
    <div ref={ref} className="sticky top-24 h-[min(78vh,640px)]" style={{ paddingTop: index * 18 }}>
      <motion.div
        style={{ scale, background: s.soft }}
        className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] p-7 shadow-[0_30px_80px_-30px_rgba(15,15,26,0.35)] ring-1 ring-black/5 sm:p-12 lg:flex-row lg:items-center lg:gap-12"
      >
        <div aria-hidden className="blob -right-20 -top-20 h-80 w-80" style={{ background: s.color, opacity: 0.35 }} />
        <div className="relative z-10 flex-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-sm" style={{ color: s.color }}>
            {s.emoji} Suite {String(index + 1).padStart(2, "0")} · {s.apps.length} {s.apps.length === 1 ? "app" : "apps"}
            {s.upcoming?.length ? ` · ${s.upcoming.length} coming soon` : ""}
          </span>
          <h3 className="font-display mt-5 text-4xl font-extrabold sm:text-6xl">{s.name}</h3>
          <p className="mt-4 max-w-md text-lg font-medium" style={{ color: s.color }}>
            {s.tagline}
          </p>
          <p className="mt-3 max-w-md text-[#3d3d52]">{s.description}</p>
          <Link
            href={`/suites/${s.id}/`}
            className="group mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white shadow-lg transition-transform hover:-translate-y-1"
            style={{ background: s.color }}
          >
            Explore the suite <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div className="relative z-10 mt-8 grid flex-1 grid-cols-3 gap-3 sm:gap-5 lg:mt-0">
          {s.apps.slice(0, 6).map((a, i) => (
            <Link key={a.slug} href={`/${a.slug}/`} className="group flex flex-col items-center gap-2 text-center">
              <motion.img
                src={a.icon}
                alt={a.shortName}
                width={96}
                height={96}
                initial={{ opacity: 0, y: 30, rotate: i % 2 ? 8 : -8 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: "spring", stiffness: 140, damping: 14 }}
                whileHover={{ y: -8, rotate: i % 2 ? 5 : -5, scale: 1.06 }}
                className="aspect-square w-full max-w-24 rounded-[24%] shadow-xl"
              />
              <span className="text-xs font-semibold text-[#3d3d52] sm:text-sm">{a.shortName}</span>
            </Link>
          ))}
          {(s.upcoming ?? []).slice(0, Math.max(0, 6 - s.apps.length)).map((u) => (
            <div key={u.name} className="flex flex-col items-center gap-2 text-center">
              <div className="grid aspect-square w-full max-w-24 place-items-center rounded-[24%] border-2 border-dashed bg-white/60 text-3xl" style={{ borderColor: s.color + "66" }}>
                {u.emoji}
              </div>
              <span className="text-xs font-semibold text-[#6b6b80] sm:text-sm">{u.name}</span>
              <span className="-mt-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ background: s.color + "1a", color: s.color }}>
                Soon
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function SuiteStack({ suites }: { suites: SuiteCard[] }) {
  return (
    <div className="relative space-y-10 pb-10">
      {suites.map((s, i) => (
        <Card key={s.id} s={s} index={i} total={suites.length} />
      ))}
    </div>
  );
}
