"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Screen } from "@/lib/apps";
import { PhoneFrame, ScreenMock, type ScreenTheme } from "./ScreenMock";

// Draggable horizontal screenshot gallery.
export default function Gallery({ screens, theme, name, icon }: { screens: Screen[]; theme: ScreenTheme; name: string; icon: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (el) setLimit(Math.max(0, el.scrollWidth - (el.parentElement?.clientWidth ?? 0)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="overflow-hidden">
      <motion.div ref={track} drag="x" dragConstraints={{ left: -limit, right: 0 }} dragElastic={0.12} className="flex w-max cursor-grab gap-8 px-5 py-6 active:cursor-grabbing sm:px-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))]">
        {screens.map((s, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 60, rotate: i % 2 ? 4 : -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 90, damping: 16 }}
            whileHover={{ y: -12, rotate: 0 }}
            className="w-[220px] shrink-0 sm:w-[250px]"
          >
            <PhoneFrame>
              <ScreenMock screen={s} theme={theme} name={name} icon={icon} />
            </PhoneFrame>
            <figcaption className="mt-4 text-center text-sm font-semibold">{s.caption}</figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </div>
  );
}
