"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Faq as FaqItem } from "@/lib/apps";

export default function Faq({ items, color }: { items: FaqItem[]; color: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 transition-shadow" style={{ boxShadow: isOpen ? `0 20px 40px -20px ${color}66` : undefined }}>
            <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 p-6 text-left text-lg font-bold" aria-expanded={isOpen}>
              {f.q}
              <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xl text-white" style={{ background: color }}>
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <p className="px-6 pb-6 leading-relaxed text-[#3d3d52]">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
