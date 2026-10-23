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
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => {
            const active = suite === c.id;
            return (
              <button key={c.id} onClick={() => setSuite(c.id)} className="relative rounded-full px-4 py-2.5 text-sm font-semibold transition-colors" style={{ color: active ? "#fff" : "#3d3d52" }}>
                {active && <motion.span layoutId="chip" className="absolute inset-0 rounded-full" style={{ background: c.color }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                {!active && <span className="absolute inset-0 rounded-full bg-white ring-1 ring-black/10" />}
                <span className="relative">
                  {c.emoji} {c.short}
                </span>
              </button>
            );
          })}
        </div>
        <label className="relative block lg:w-72">
          <span className="sr-only">Search apps</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search apps…"
            className="w-full rounded-full bg-white px-5 py-3 pl-11 text-sm outline-none ring-1 ring-black/10 transition-shadow focus:ring-2 focus:ring-[#8b5cf6]"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6b80]">⌕</span>
        </label>
      </div>

      <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((a) => (
            <motion.div key={a.slug} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 28 }}>
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
