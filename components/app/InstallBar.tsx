"use client";

/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const KEY = "ofb-installbar-hidden";

// Phone-only bar that slides up after the visitor scrolls: a gentle nudge to install the app.
export default function InstallBar({ name, icon, color, playUrl }: { name: string; icon: string; color: string; playUrl: string }) {
  const { scrollY } = useScroll();
  const [past, setPast] = useState(false);
  const [hidden, setHidden] = useState(true);
  useMotionValueEvent(scrollY, "change", (v) => setPast(v > 600));

  useEffect(() => {
    try {
      setHidden(sessionStorage.getItem(KEY) === "1");
    } catch {
      setHidden(false);
    }
  }, []);

  const close = () => {
    setHidden(true);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* stays closed for this page view only */
    }
  };

  return (
    <AnimatePresence>
      {past && !hidden && (
        <motion.div
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-3 rounded-2xl bg-white/95 p-2.5 shadow-[0_20px_50px_-15px_rgba(15,15,26,0.45)] ring-1 ring-black/5 backdrop-blur-xl sm:hidden"
        >
          <img src={icon} alt="" className="h-11 w-11 shrink-0 rounded-xl" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{name}</p>
            <p className="text-xs text-[#6b6b80]">Free on Google Play</p>
          </div>
          <a href={playUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full px-4 py-2.5 text-sm font-bold text-white" style={{ background: color }}>
            Get app
          </a>
          <button onClick={close} aria-label="Close" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#6b6b80] hover:bg-black/5">
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
