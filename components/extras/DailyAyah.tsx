"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import type { Ayah } from "@/lib/ayat";

const dayNumber = (d = new Date()) => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);

// The same verse for everyone on a given day, with share and "another verse" buttons.
export default function DailyAyah({ ayat, color = "#0f766e" }: { ayat: Ayah[]; color?: string }) {
  const [i, setI] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => setI(dayNumber() % ayat.length), [ayat.length]);

  const a = ayat[i ?? 0];
  const [s, v] = a.ref.split(":");
  const share = async () => {
    const text = `“${a.text}” (Quran ${a.ref})\n\nDaily Ayah: https://ofbuilder.com/ilmai/ayah/`;
    track("ayah_share");
    try {
      if (navigator.share) await navigator.share({ text });
      else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* dismissed */
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] p-8 text-center text-white shadow-2xl sm:p-14" style={{ background: `radial-gradient(120% 100% at 50% 0%, ${color}, #062b29)` }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px]" />
      <p className="relative text-sm font-bold uppercase tracking-[0.25em] text-emerald-200">{i === null ? "Ayah of the day" : i === dayNumber() % ayat.length ? "Ayah of the day" : "Another ayah"}</p>
      <blockquote className={`font-display relative mx-auto mt-6 max-w-2xl text-2xl font-bold leading-snug transition-opacity sm:text-4xl ${i === null ? "opacity-0" : "opacity-100"}`}>“{a.text}”</blockquote>
      <p className="relative mt-5 font-semibold text-emerald-100">
        Surah {a.surah} · {a.ref}
      </p>
      <div className="relative mt-8 flex flex-wrap justify-center gap-2">
        <button onClick={share} className="h-11 rounded-full bg-white px-5 text-sm font-bold text-[#062b29]">
          {copied ? "Copied ✓" : "Share"}
        </button>
        <button onClick={() => setI((x) => ((x ?? 0) + 1) % ayat.length)} className="h-11 rounded-full px-5 text-sm font-bold ring-1 ring-white/30 hover:bg-white/10">
          Another ayah ↻
        </button>
        <a href={`https://quran.com/${s}/${v}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full px-5 text-sm font-bold ring-1 ring-white/30 hover:bg-white/10">
          Read in Arabic ↗
        </a>
      </div>
    </div>
  );
}
