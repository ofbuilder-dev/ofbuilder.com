"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type Item = { slug: string; name: string; shortName: string; tagline: string; icon: string; suiteId: string; primary: string; soft: string; rating?: number };
type SuiteChip = { id: string; short: string; emoji: string; color: string };

export default function Directory({ items, suites }: { items: Item[]; suites: SuiteChip[] }) {
  const [suite, setSuite] = useState<string>("all");
  const [q, setQ] = useState("");

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((a) => (suite === "all" || a.suiteId === suite) && (!needle || `${a.name} ${a.tagline}`.toLowerCase().includes(needle)));
  }, [items, suite, q]);

  const chips = [{ id: "all", short: "All apps", emoji: "✨", color: "#0f0f1a" }, ...suites];

  return (
    <div>
      <div className="sticky top-28 z-30 flex flex-col gap-2 rounded-[1.75rem] bg-white/85 p-2 shadow-[0_16px_40px_-20px_rgba(15,15,26,0.35)] ring-1 ring-black/5 backdrop-blur-xl lg:flex-row lg:items-center">
        <div className="no-scrollbar -mx-1 flex min-w-0 flex-1 gap-1 overflow-x-auto px-1">
          {chips.map((c) => {
            const active = suite === c.id;
            return (
              <button key={c.id} onClick={() => setSuite(c.id)} className="relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2.5 text-sm font-semibold transition-colors" style={{ color: active ? "#fff" : "#3d3d52" }}>
                {active && <motion.span layoutId="chip" className="absolute inset-0 rounded-full" style={{ background: c.color }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                {!active && <span className="absolute inset-0 rounded-full transition-colors hover:bg-black/5" />}
                <span className="relative">
                  {c.emoji} {c.short}
                </span>
              </button>
            );
          })}
        </div>
        <label className="relative block shrink-0 lg:w-52">
          <span className="sr-only">Search apps</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search apps…"
            className="h-11 w-full rounded-full bg-[#f6f3ee] px-5 pl-11 text-sm outline-none ring-1 ring-transparent transition-shadow focus:bg-white focus:ring-2 focus:ring-[#8b5cf6]"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b80]">⌕</span>
        </label>
      </div>

      <p className="mt-8 px-1 text-sm font-medium text-[#6b6b80]">
        Showing {shown.length} {shown.length === 1 ? "app" : "apps"}
        {suite !== "all" && <> in {chips.find((c) => c.id === suite)?.short}</>}
      </p>
      <motion.div layout className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((a) => (
            <motion.div key={a.slug} layout className="min-w-0" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 28 }}>
              <Link href={`/${a.slug}/`} className="group flex h-full items-center gap-4 rounded-[1.75rem] bg-white p-5 ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl">
                <img src={a.icon} alt="" width={68} height={68} className="h-[68px] w-[68px] shrink-0 rounded-[1.1rem] shadow-md transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" loading="lazy" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-bold">{a.shortName}</h3>
                    {a.rating && <span className="shrink-0 text-xs font-bold text-amber-500">★ {a.rating.toFixed(1)}</span>}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-[#6b6b80]">{a.tagline}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all group-hover:translate-x-1" style={{ background: a.soft, color: a.primary }}>
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {shown.length === 0 && <p className="mt-16 text-center text-[#6b6b80]">No apps match “{q}”.</p>}
    </div>
  );
}
