"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Screen } from "@/lib/apps";
import { PhoneFrame, ScreenMock, type ScreenTheme } from "./ScreenMock";

// Hero phone that auto-cycles through the app's screens.
export default function PhoneShowcase({ screens, theme, name, icon }: { screens: Screen[]; theme: ScreenTheme; name: string; icon: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % screens.length), 2800);
    return () => clearInterval(t);
  }, [screens.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotate: 6 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-[240px] sm:w-[270px]"
    >
      <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <PhoneFrame>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <ScreenMock screen={screens[i]} theme={theme} name={name} icon={icon} />
            </motion.div>
          </AnimatePresence>
        </PhoneFrame>
      </motion.div>
      <div className="mt-5 flex justify-center gap-1.5">
        {screens.map((_, n) => (
          <button
            key={n}
            onClick={() => setI(n)}
            aria-label={`Show screen ${n + 1}`}
            className="h-2 rounded-full transition-all duration-500"
            style={{ width: n === i ? 24 : 8, background: n === i ? theme.primary : "rgba(127,127,140,.4)" }}
          />
        ))}
      </div>
    </motion.div>
  );
}
