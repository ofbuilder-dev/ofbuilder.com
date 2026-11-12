"use client";

import { useState } from "react";
import { CurrencyPicker, Field, fmt, num } from "./MoneyField";

// Savings goal calculator: how long a monthly amount takes to reach a goal, or how much to save each month for a date.
export default function SavingsCalc() {
  const [cur, setCur] = useState("£");
  const [mode, setMode] = useState<"time" | "monthly">("time");
  const [goal, setGoal] = useState("5000");
  const [start, setStart] = useState("500");
  const [monthly, setMonthly] = useState("200");
  const [months, setMonths] = useState("24");
  const [rate, setRate] = useState("4");

  const g = num(goal);
  const s = num(start);
  const r = num(rate) / 100 / 12;

  // How long: month by month, interest added monthly, deposit at the end of each month.
  let n = 0;
  let bal = s;
  let paidIn = s;
  if (mode === "time" && g > s && num(monthly) > 0) {
    while (bal < g && n < 1200) {
      bal = bal * (1 + r) + num(monthly);
      paidIn += num(monthly);
      n++;
    }
  }
  // How much per month for a set number of months.
  const m = Math.max(1, Math.round(num(months)));
  const grow = Math.pow(1 + r, m);
  const need = r > 0 ? ((g - s * grow) * r) / (grow - 1) : (g - s) / m;

  const span = (k: number) => {
    const y = Math.floor(k / 12);
    const mo = k % 12;
    return [y && `${y} year${y > 1 ? "s" : ""}`, mo && `${mo} month${mo > 1 ? "s" : ""}`].filter(Boolean).join(" ") || "0 months";
  };
  const reach = new Date();
  reach.setMonth(reach.getMonth() + n);

  return (
    <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="What to work out">
          {[
            ["time", "How long will it take?"],
            ["monthly", "How much a month?"],
          ].map(([k, l]) => (
            <button key={k} onClick={() => setMode(k as "time" | "monthly")} aria-pressed={mode === k} className={`h-10 rounded-full px-4 text-sm font-bold ${mode === k ? "bg-[#0f0f1a] text-white" : "bg-black/[0.05] text-[#3d3d52]"}`}>
              {l}
            </button>
          ))}
        </div>
        <CurrencyPicker value={cur} onChange={setCur} />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Savings goal" value={goal} onChange={setGoal} prefix={cur} />
        <Field label="Saved so far" value={start} onChange={setStart} prefix={cur} />
        {mode === "time" ? (
          <Field label="You save each month" value={monthly} onChange={setMonthly} prefix={cur} />
        ) : (
          <Field label="Months to reach the goal" value={months} onChange={setMonths} suffix="months" />
        )}
        <Field label="Interest rate (yearly)" value={rate} onChange={setRate} suffix="%" hint="Use 0 if your savings earn no interest" />
      </div>

      <div className="mt-8 rounded-2xl bg-[#047857] p-6 text-white">
        {g <= s ? (
          <p className="font-display text-2xl font-extrabold">You&apos;ve already reached this goal 🎉</p>
        ) : mode === "time" ? (
          num(monthly) <= 0 ? (
            <p className="font-semibold">Enter how much you can save each month.</p>
          ) : n >= 1200 ? (
            <p className="font-semibold">That would take more than 100 years. Try saving a little more each month.</p>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-wider text-white/80">Time to reach {fmt(cur, g)}</p>
              <p className="font-display mt-1 text-4xl font-extrabold">{span(n)}</p>
              <p className="mt-1 text-white/85">
                Around {reach.toLocaleDateString(undefined, { month: "long", year: "numeric" })}. You pay in {fmt(cur, paidIn)} and earn about {fmt(cur, Math.max(0, bal - paidIn))} in interest.
              </p>
            </>
          )
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-wider text-white/80">Save each month</p>
            <p className="font-display mt-1 text-4xl font-extrabold tabular-nums">{fmt(cur, Math.max(0, need), 2)}</p>
            <p className="mt-1 text-white/85">
              For {span(m)} to reach {fmt(cur, g)}. That&apos;s about {fmt(cur, Math.max(0, need) / 4.33, 2)} a week.
            </p>
          </>
        )}
      </div>
      <p className="mt-4 text-xs text-[#6b6b80]">An estimate with interest added monthly at a fixed rate, before any tax. Nothing leaves this device.</p>
    </div>
  );
}
