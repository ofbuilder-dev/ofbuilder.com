"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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

const PHONE_SHOWN = 3; // one row of four with the "+N more" tile
const DESKTOP_SHOWN = 5; // two rows of three with the "+N more" tile

// Cards stick to the top and shrink slightly as the next one slides over them.
// On phones the card is kept compact (no long description, smaller icons) so it always fits the screen.
function Card({ s, index, total }: { s: SuiteCard; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.03]);
  // Watch the whole card: per-icon viewport detection is unreliable inside sticky, scaled cards.
  const inView = useInView(ref, { once: true, amount: 0.15 });
  // Apps first, then "coming soon" placeholders. Extra items collapse into a "+N more" tile.
  const tiles = [
    ...s.apps.map((a) => ({ kind: "app" as const, ...a })),
    ...(s.upcoming ?? []).map((u) => ({ kind: "soon" as const, ...u })),
  ];

  return (
    <div ref={ref} className="sticky top-[6.5rem] lg:top-24 lg:h-[min(78vh,640px)]" style={{ paddingTop: index * 14 }}>
      <motion.div
        style={{ scale, background: s.soft }}
        className="relative flex min-h-[min(calc(100svh-11rem),620px)] flex-col overflow-hidden rounded-[2rem] p-6 shadow-[0_30px_80px_-30px_rgba(15,15,26,0.35)] ring-1 ring-black/5 sm:rounded-[2.5rem] sm:p-12 lg:h-full lg:min-h-0 lg:flex-row lg:items-center lg:gap-12"
      >
        <div aria-hidden className="blob -right-20 -top-20 h-80 w-80" style={{ background: s.color, opacity: 0.35 }} />
        {/* phone-only watermark filling the lower part of the tall card */}
        <span aria-hidden className="pointer-events-none absolute -bottom-6 -right-4 select-none text-[9rem] leading-none opacity-15 sm:hidden">
          {s.emoji}
        </span>
        <div className="relative z-10 sm:flex-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-sm" style={{ color: s.color }}>
            {s.emoji} Suite {String(index + 1).padStart(2, "0")} · {s.apps.length} {s.apps.length === 1 ? "app" : "apps"}
            {s.upcoming?.length ? ` · ${s.upcoming.length} coming soon` : ""}
          </span>
          <h3 className="font-display mt-3 text-3xl font-extrabold sm:mt-5 sm:text-6xl">{s.name}</h3>
          <p className="mt-2 max-w-md text-base font-medium sm:mt-4 sm:text-lg" style={{ color: s.color }}>
            {s.tagline}
          </p>
          <p className="mt-3 line-clamp-3 max-w-md text-[15px] leading-relaxed text-[#3d3d52] sm:line-clamp-none sm:text-base">{s.description}</p>
          <Link
            href={`/suites/${s.id}/`}
            className="group mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-1 sm:mt-8 sm:px-6 sm:py-3.5 sm:text-base"
            style={{ background: s.color }}
          >
            Explore the suite <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div className="relative z-10 mt-6 grid grid-cols-4 gap-x-2 gap-y-3 sm:mt-8 sm:flex-1 sm:grid-cols-3 sm:gap-5 lg:mt-0">
          {tiles.slice(0, DESKTOP_SHOWN).map((t, i) => {
            const hideOnPhone = i >= PHONE_SHOWN ? "hidden sm:flex" : "flex";
            return t.kind === "app" ? (
              <Link key={t.slug} href={`/${t.slug}/`} className={`group ${hideOnPhone} min-w-0 flex-col items-center gap-1.5 text-center sm:gap-2`}>
                <motion.img
                  src={t.icon}
                  alt={t.shortName}
                  width={96}
                  height={96}
                  initial={{ opacity: 0, y: 30, rotate: i % 2 ? 8 : -8 }}
                  animate={inView ? { opacity: 1, y: 0, rotate: 0 } : undefined}
                  transition={{ delay: i * 0.07, type: "spring", stiffness: 140, damping: 14 }}
                  whileHover={{ y: -8, rotate: i % 2 ? 5 : -5, scale: 1.06 }}
                  className="aspect-square w-full max-w-16 rounded-[24%] shadow-xl sm:max-w-24"
                />
                <span className="w-full truncate text-[10px] font-semibold leading-tight text-[#3d3d52] sm:whitespace-normal sm:text-sm sm:[overflow-wrap:anywhere]">{t.shortName}</span>
              </Link>
            ) : (
              <div key={t.name} className={`${hideOnPhone} min-w-0 flex-col items-center gap-1.5 text-center sm:gap-2`}>
                <div className="grid aspect-square w-full max-w-16 place-items-center rounded-[24%] border-2 border-dashed bg-white/60 text-2xl sm:max-w-24 sm:text-3xl" style={{ borderColor: s.color + "66" }}>
                  {t.emoji}
                </div>
                <span className="w-full truncate text-[10px] font-semibold text-[#6b6b80] sm:whitespace-normal sm:text-sm">{t.name}</span>
                <span className="-mt-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ background: s.color + "1a", color: s.color }}>
                  Soon
                </span>
              </div>
            );
          })}
          {[
            { extra: tiles.length - PHONE_SHOWN, cls: "flex sm:hidden" },
            { extra: tiles.length - DESKTOP_SHOWN, cls: "hidden sm:flex" },
          ]
            .filter((m) => m.extra > 0)
            .map((m) => (
              <Link key={m.cls} href={`/suites/${s.id}/`} className={`group ${m.cls} min-w-0 flex-col items-center gap-1.5 text-center sm:gap-2`}>
                <span
                  className="grid aspect-square w-full max-w-16 place-items-center rounded-[24%] text-lg font-extrabold text-white shadow-xl transition-transform group-hover:-translate-y-1 sm:max-w-24 sm:text-2xl"
                  style={{ background: s.color }}
                >
                  +{m.extra}
                </span>
                <span className="w-full truncate text-[10px] font-semibold text-[#3d3d52] sm:text-sm">Show more</span>
              </Link>
            ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function SuiteStack({ suites }: { suites: SuiteCard[] }) {
  return (
    <div className="relative space-y-6 pb-10 lg:space-y-10">
      {suites.map((s, i) => (
        <Card key={s.id} s={s} index={i} total={suites.length} />
      ))}
    </div>
  );
}
