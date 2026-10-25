"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

type Day = { day: number; title: string; tasks: string[] };

// Day-by-day study plan with 7/14/30-day options and a print button (print styles hide the rest of the page).
export default function StudyPlan({ plans, color, examName, slug }: { plans: Record<string, Day[]>; color: string; examName: string; slug: string }) {
  const keys = Object.keys(plans);
  const [k, setK] = useState(keys[1] ?? keys[0]);
  const plan = plans[k];

  return (
    <div id="study-plan" className="print-area rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Your {k}-day study plan</h2>
          <p className="mt-1 text-[#3d3d52]">A simple plan for the {examName}. Print it and tick off each day.</p>
        </div>
        <div className="no-print flex flex-wrap gap-2">
          <div className="flex gap-1 rounded-full bg-black/[0.04] p-1">
            {keys.map((x) => (
              <button key={x} onClick={() => setK(x)} className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${x === k ? "text-white shadow" : "text-[#3d3d52]"}`} style={x === k ? { background: color } : undefined}>
                {x} days
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              track("print_plan", slug);
              window.print();
            }}
            className="rounded-full px-4 py-2 text-sm font-bold ring-1 ring-black/10 hover:bg-black/5"
          >
            🖨 Print / save PDF
          </button>
        </div>
      </div>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2">
        {plan.map((d) => (
          <li key={d.day} className="break-inside-avoid rounded-2xl p-5 ring-1 ring-black/5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-extrabold text-white" style={{ background: color }}>
                {d.day}
              </span>
              <span className="font-bold leading-snug">{d.title}</span>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-[#3d3d52]">
              {d.tasks.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded border border-black/20" />
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
