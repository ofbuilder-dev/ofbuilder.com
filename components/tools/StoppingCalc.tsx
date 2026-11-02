"use client";

import { useState } from "react";

// Typical stopping distances from the UK Highway Code (dry road, car in good condition).
const DATA = [
  { mph: 20, thinking: 6, braking: 6 },
  { mph: 30, thinking: 9, braking: 14 },
  { mph: 40, thinking: 12, braking: 24 },
  { mph: 50, thinking: 15, braking: 38 },
  { mph: 60, thinking: 18, braking: 55 },
  { mph: 70, thinking: 21, braking: 75 },
];
const CAR = 4; // metres, an average car length, for the "car lengths" figure
const ROADS = { dry: { label: "Dry", factor: 1 }, wet: { label: "Wet", factor: 2 }, ice: { label: "Icy", factor: 10 } };

export default function StoppingCalc() {
  const [i, setI] = useState(1);
  const [road, setRoad] = useState<keyof typeof ROADS>("dry");
  const d = DATA[i];
  const braking = d.braking * ROADS[road].factor;
  const total = d.thinking + braking;
  const max = DATA[DATA.length - 1].thinking + DATA[DATA.length - 1].braking * ROADS[road].factor;

  return (
    <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#3d3d52]">Speed</p>
          <div className="font-display text-5xl font-extrabold text-[#2563eb]">{d.mph} mph</div>
        </div>
        <div className="flex gap-1 rounded-2xl bg-black/[0.04] p-1.5">
          {(Object.keys(ROADS) as (keyof typeof ROADS)[]).map((k) => (
            <button key={k} onClick={() => setRoad(k)} className={`rounded-xl px-4 py-2 text-sm font-bold ${road === k ? "bg-[#2563eb] text-white shadow" : "text-[#3d3d52]"}`}>
              {ROADS[k].label}
            </button>
          ))}
        </div>
      </div>
      <input type="range" min={0} max={DATA.length - 1} value={i} onChange={(e) => setI(Number(e.target.value))} className="mt-6 w-full accent-[#2563eb]" aria-label="Speed" />
      <div className="mt-1 flex justify-between text-xs font-semibold text-[#6b6b80]">
        {DATA.map((x) => (
          <span key={x.mph}>{x.mph}</span>
        ))}
      </div>

      <div className="mt-8 flex h-10 overflow-hidden rounded-full bg-black/5" aria-hidden>
        <div className="bg-amber-400" style={{ width: `${(d.thinking / max) * 100}%` }} />
        <div className="bg-rose-500" style={{ width: `${(braking / max) * 100}%` }} />
      </div>
      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-amber-50 p-4">
          <dt className="text-xs font-bold uppercase tracking-wider text-amber-700">Thinking distance</dt>
          <dd className="font-display mt-1 text-3xl font-extrabold">{d.thinking} m</dd>
        </div>
        <div className="rounded-2xl bg-rose-50 p-4">
          <dt className="text-xs font-bold uppercase tracking-wider text-rose-700">Braking distance</dt>
          <dd className="font-display mt-1 text-3xl font-extrabold">{road === "dry" ? "" : "up to "}{braking} m</dd>
        </div>
        <div className="rounded-2xl bg-[#eaf1ff] p-4">
          <dt className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">Total stopping distance</dt>
          <dd className="font-display mt-1 text-3xl font-extrabold">{total} m</dd>
          <dd className="text-sm text-[#6b6b80]">about {Math.round(total / CAR)} car lengths</dd>
        </div>
      </dl>
      {road !== "dry" && (
        <p className="mt-4 text-sm font-semibold text-[#3d3d52]">
          {road === "wet" ? "On wet roads, braking distances can be at least double." : "On icy roads, braking distances can be up to ten times longer."} Totals here are estimates.
        </p>
      )}
    </div>
  );
}
