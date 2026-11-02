"use client";

import { useEffect, useState } from "react";
import { formatTime, METHODS, prayerTimes, type Times } from "@/lib/prayTimes";
import LocationPicker from "./LocationPicker";
import { useLocation } from "./useLocation";

const NAMES: [keyof Times, string, string][] = [
  ["fajr", "Fajr", "🌅"],
  ["sunrise", "Sunrise", "☀️"],
  ["dhuhr", "Dhuhr", "🕛"],
  ["asr", "Asr", "🌤️"],
  ["maghrib", "Maghrib", "🌇"],
  ["isha", "Isha", "🌙"],
];

// Today's prayer times for the visitor's location, calculated in the browser.
export default function PrayerTimes() {
  const l = useLocation();
  const [method, setMethod] = useState("MWL");
  const [asr, setAsr] = useState<1 | 2>(1);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const times = l.loc && now ? prayerTimes(now, l.loc.lat, l.loc.lng, -now.getTimezoneOffset() / 60, METHODS[method], asr) : null;
  const nowH = now ? now.getHours() + now.getMinutes() / 60 : 0;
  const next = times ? NAMES.filter(([k]) => k !== "sunrise").find(([k]) => times[k] > nowH)?.[0] ?? "fajr" : null;

  return (
    <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-10">
      <LocationPicker {...l} />
      {times && now && (
        <>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#0f766e]">
            {now.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {NAMES.map(([k, name, icon]) => (
              <div key={k} className={`flex items-center justify-between rounded-2xl p-5 ${k === next ? "bg-[#0f766e] text-white shadow-lg" : k === "sunrise" ? "bg-[#faf8f4]" : "bg-[#ecfaf6]"}`}>
                <span className="text-lg font-bold">
                  {icon} {name}
                  {k === next && <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">Next</span>}
                </span>
                <span className="font-display text-2xl font-extrabold tabular-nums">{formatTime(times[k])}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[#3d3d52]">
              Calculation method
              <select value={method} onChange={(e) => setMethod(e.target.value)} className="mt-1.5 block h-12 w-full rounded-xl bg-[#faf8f4] px-3 ring-1 ring-black/10">
                {Object.entries(METHODS).map(([k, m]) => (
                  <option key={k} value={k}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold text-[#3d3d52]">
              Asr method
              <select value={asr} onChange={(e) => setAsr(Number(e.target.value) as 1 | 2)} className="mt-1.5 block h-12 w-full rounded-xl bg-[#faf8f4] px-3 ring-1 ring-black/10">
                <option value={1}>Standard (Shafi'i, Maliki, Hanbali)</option>
                <option value={2}>Hanafi</option>
              </select>
            </label>
          </div>
        </>
      )}
      {!l.loc && <p className="mt-6 text-[#3d3d52]">Choose your location to see today's prayer times.</p>}
    </div>
  );
}
