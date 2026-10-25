"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import Logo from "./Logo";

type SuiteLink = { id: string; name: string; tagline: string; emoji: string; color: string };

export default function NavClient({ suites, playUrl }: { suites: SuiteLink[]; playUrl: string }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`relative flex w-full max-w-7xl items-center justify-between rounded-full px-4 py-3 transition-all duration-500 sm:px-6 sm:py-3.5 ${
          scrolled ? "bg-white/80 shadow-[0_10px_40px_-12px_rgba(15,15,26,0.25)] ring-1 ring-black/5 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <Link href="/" aria-label="OfBuilder home" className="pl-1">
          <Logo size={46} />
        </Link>

        <div className="hidden items-center gap-1.5 text-[17px] font-semibold text-[#3d3d52] md:flex">
          <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button className="rounded-full px-5 py-2.5 transition-colors hover:bg-black/5" aria-expanded={open}>
              Suites ▾
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-full w-[520px] -translate-x-1/2 pt-3"
                >
                  <div className="grid grid-cols-2 gap-1 rounded-3xl bg-white p-2 shadow-2xl ring-1 ring-black/5">
                    {suites.map((s) => (
                      <Link key={s.id} href={`/suites/${s.id}/`} className="group flex gap-3 rounded-2xl p-3 transition-colors hover:bg-black/[0.03]">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xl transition-transform group-hover:scale-110 group-hover:rotate-6" style={{ background: s.color + "1f" }}>
                          {s.emoji}
                        </span>
                        <span>
                          <span className="block font-semibold text-[#0f0f1a]">{s.name}</span>
                          <span className="block text-xs leading-snug text-[#6b6b80]">{s.tagline}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/apps/" className="rounded-full px-5 py-2.5 transition-colors hover:bg-black/5">All apps</Link>
          <Link href="/free-tests/" className="rounded-full px-5 py-2.5 text-[#10b981] transition-colors hover:bg-black/5">Free tests</Link>
          <Link href="/blog/" className="rounded-full px-5 py-2.5 transition-colors hover:bg-black/5">Blog</Link>
          <Link href="/#studio" className="rounded-full px-5 py-2.5 transition-colors hover:bg-black/5">Studio</Link>
          <Link href="/contact/" className="rounded-full px-5 py-2.5 transition-colors hover:bg-black/5">Contact</Link>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-[#0f0f1a] px-7 py-3.5 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg sm:inline-flex"
          >
            Google Play ↗
          </a>
          <button
            onClick={() => setMenu((m) => !m)}
            className="grid h-12 w-12 place-items-center rounded-full bg-white shadow ring-1 ring-black/5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menu}
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 top-0 h-0.5 w-4 bg-black transition-transform ${menu ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-4 bg-black transition-transform ${menu ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-x-0 top-full mt-2 rounded-3xl bg-white p-3 shadow-2xl ring-1 ring-black/5 md:hidden"
            >
              {suites.map((s) => (
                <Link key={s.id} href={`/suites/${s.id}/`} onClick={() => setMenu(false)} className="flex items-center gap-3 rounded-2xl p-3 font-medium hover:bg-black/5">
                  <span className="text-xl">{s.emoji}</span> {s.name}
                </Link>
              ))}
              <div className="my-2 h-px bg-black/5" />
              {[
                ["All apps", "/apps/"],
                ["Free tests ✨", "/free-tests/"],
                ["Success stories", "/stories/"],
                ["Blog", "/blog/"],
                ["Studio", "/#studio"],
                ["Contact", "/contact/"],
              ].map(([l, h]) => (
                <Link key={h} href={h} onClick={() => setMenu(false)} className="block rounded-2xl p-3 font-medium hover:bg-black/5">
                  {l}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
