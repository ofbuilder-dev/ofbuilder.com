"use client";

import { useEffect, useState } from "react";

const CYCLE = 90; // minutes per sleep cycle
const FALL_ASLEEP = 15; // average minutes to fall asleep

const fmt = (d: Date) => d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
const addMin = (d: Date, m: number) => new Date(d.getTime() + m * 60000);

// Sleep calculator: bedtimes for a wake-up time, or wake-up times if you go to bed now.
export default function SleepCalc() {
  const [mode, setMode] = useState<"wake" | "now">("wake");
  const [wake, setWake] = useState("07:00");
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  let times: { time: string; cycles: number; hours: string }[] = [];
  if (mode === "wake") {
    const [h, m] = wake.split(":").map(Number);
    const target = new Date();
    target.setHours(h || 0, m || 0, 0, 0);
    times = [6, 5, 4, 3].map((c) => ({ time: fmt(addMin(target, -(c * CYCLE + FALL_ASLEEP))), cycles: c, hours: `${(c * CYCLE) / 60} h` }));
  } else if (now) {
    times = [3, 4, 5, 6].map((c) => ({ time: fmt(addMin(now, c * CYCLE + FALL_ASLEEP)), cycles: c, hours: `${(c * CYCLE) / 60} h` }));
  }

  return (
    <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-10">
      <div className="grid grid-cols-2 gap-1 rounded-2xl bg-black/[0.04] p-1.5">
        {[
          ["wake", "I want to wake up at…"],
          ["now", "I'm going to bed now"],
        ].map(([k, l]) => (
          <button key={k} onClick={() => setMode(k as "wake" | "now")} className={`rounded-xl px-3 py-3 text-sm font-bold transition-all ${mode === k ? "bg-[#4c1d95] text-white shadow" : "text-[#3d3d52]"}`}>
            {l}
          </button>
        ))}
      </div>

      {mode === "wake" && (
        <label className="mt-6 block text-sm font-semibold text-[#3d3d52]">
          Wake-up time
          <input type="time" value={wake} onChange={(e) => setWake(e.target.value)} className="mt-1.5 block h-14 w-full rounded-2xl bg-[#faf8f4] px-5 text-2xl font-bold ring-1 ring-black/10 outline-none focus:ring-2 focus:ring-[#7c3aed] sm:w-56" />
        </label>
      )}

      <h2 className="font-display mt-8 text-2xl font-extrabold">{mode === "wake" ? "Try to fall asleep at one of these times:" : "Set your alarm for one of these times:"}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {times.map((t, i) => (
          <div key={t.cycles} className={`rounded-2xl p-5 ${i === 0 ? "bg-[#4c1d95] text-white" : "bg-[#f3efff]"}`}>
            <div className="font-display text-4xl font-extrabold">{t.time}</div>
            <div className={`mt-1 text-sm font-semibold ${i === 0 ? "text-white/75" : "text-[#6b6b80]"}`}>
              {t.cycles} sleep cycles · {t.hours} of sleep{i === 0 ? (mode === "wake" ? " · best" : "") : ""}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-[#6b6b80]">
        Based on 90-minute sleep cycles and about 15 minutes to fall asleep. Most adults need 7 to 9 hours, so 5 or 6 cycles is ideal. Waking at the end of a cycle helps you feel less groggy.
      </p>
    </div>
  );
}
