"use client";

import { useState } from "react";
import { CurrencyPicker, Field, fmt, num } from "./MoneyField";

const SPLITS = [
  { id: "50/30/20", needs: 50, wants: 30, save: 20 },
  { id: "60/20/20", needs: 60, wants: 20, save: 20 },
  { id: "70/20/10", needs: 70, wants: 20, save: 10 },
];

// 50/30/20 budget: split take-home pay into needs, wants and savings, and compare with what you spend now.
export default function BudgetCalc() {
  const [cur, setCur] = useState("£");
  const [income, setIncome] = useState("2500");
  const [split, setSplit] = useState(SPLITS[0]);
  const [needsNow, setNeedsNow] = useState("");
  const [wantsNow, setWantsNow] = useState("");
  const pay = num(income);
  const rows = [
    { label: "Needs", pct: split.needs, now: needsNow, set: setNeedsNow, note: "Rent or mortgage, bills, food shopping, transport, insurance, minimum debt payments", bg: "bg-[#ecfdf5]", tx: "text-[#047857]" },
    { label: "Wants", pct: split.wants, now: wantsNow, set: setWantsNow, note: "Eating out, subscriptions, hobbies, holidays, shopping", bg: "bg-[#fff7ed]", tx: "text-[#b45309]" },
  ];
  const saveNow = needsNow || wantsNow ? pay - num(needsNow) - num(wantsNow) : null;

  return (
    <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Budget split">
          {SPLITS.map((s) => (
            <button key={s.id} onClick={() => setSplit(s)} aria-pressed={split.id === s.id} className={`h-10 rounded-full px-4 text-sm font-bold ${split.id === s.id ? "bg-[#0f0f1a] text-white" : "bg-black/[0.05] text-[#3d3d52]"}`}>
              {s.id}
            </button>
          ))}
        </div>
        <CurrencyPicker value={cur} onChange={setCur} />
      </div>
      <div className="mt-6 max-w-sm">
        <Field label="Monthly take-home pay (after tax)" value={income} onChange={setIncome} prefix={cur} />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[...rows.map((r) => ({ label: r.label, pct: r.pct, bg: r.bg, tx: r.tx })), { label: "Savings & debt", pct: split.save, bg: "bg-[#047857] text-white", tx: "text-white/80" }].map((r) => (
          <div key={r.label} className={`rounded-2xl p-5 ${r.bg}`}>
            <p className={`text-xs font-bold uppercase tracking-wider ${r.tx}`}>
              {r.label} · {r.pct}%
            </p>
            <p className="font-display mt-1 text-3xl font-extrabold tabular-nums">{fmt(cur, (pay * r.pct) / 100)}</p>
            <p className={`text-sm ${r.tx}`}>{fmt(cur, (pay * r.pct * 12) / 100)} a year</p>
          </div>
        ))}
      </div>

      <h2 className="font-display mt-10 text-xl font-extrabold">Compare with what you spend now (optional)</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {rows.map((r) => (
          <Field key={r.label} label={`${r.label} now, per month`} value={r.now} onChange={r.set} prefix={cur} hint={r.note} />
        ))}
      </div>
      {saveNow !== null && pay > 0 && (
        <div className="mt-5 space-y-2 rounded-2xl bg-[#faf8f4] p-5 text-[#3d3d52]">
          {rows.map((r) => {
            const target = (pay * r.pct) / 100;
            const diff = num(r.now) - target;
            return (
              <p key={r.label}>
                <strong className="text-[#0f0f1a]">{r.label}:</strong> {fmt(cur, num(r.now))} ({Math.round((num(r.now) / pay) * 100)}%).{" "}
                {Math.abs(diff) < 1 ? "Right on target." : diff > 0 ? `${fmt(cur, diff)} over the target.` : `${fmt(cur, -diff)} under the target.`}
              </p>
            );
          })}
          <p>
            <strong className="text-[#0f0f1a]">Left for savings and debt:</strong> {fmt(cur, saveNow)} ({Math.round((saveNow / pay) * 100)}%), against a target of {fmt(cur, (pay * split.save) / 100)}.
          </p>
        </div>
      )}
      <p className="mt-4 text-xs text-[#6b6b80]">Everything is worked out on this device. Nothing is sent anywhere.</p>
    </div>
  );
}
