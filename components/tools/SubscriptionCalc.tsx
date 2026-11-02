"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

type Sub = { id: number; name: string; price: string; every: "week" | "month" | "year" };
const PER_YEAR = { week: 52, month: 12, year: 1 };
const SUGGESTIONS = ["Netflix", "Spotify", "YouTube Premium", "Disney+", "Amazon Prime", "Apple iCloud", "Google One", "ChatGPT", "Gym", "Phone plan", "Xbox / PlayStation", "News app"];
const CURRENCIES = ["£", "$", "€", "₹", "৳", "A$", "C$"];
const KEY = "ofb-subs";

// Subscription cost calculator: add what you pay for and see the monthly and yearly total. Stays on this device.
export default function SubscriptionCalc() {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [cur, setCur] = useState("£");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) ?? "null");
      if (s?.subs) setSubs(s.subs);
      if (s?.cur) setCur(s.cur);
    } catch {
      /* start empty */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ subs, cur }));
    } catch {
      /* not remembered */
    }
  }, [subs, cur, ready]);

  const add = (name = "") => {
    setSubs((s) => [...s, { id: Date.now() + s.length, name, price: "", every: "month" }]);
    track("subs_add", name || "custom");
  };
  const update = (id: number, patch: Partial<Sub>) => setSubs((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const yearly = subs.reduce((t, s) => t + (parseFloat(s.price) || 0) * PER_YEAR[s.every], 0);
  const money = (n: number) => `${cur}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const used = new Set(subs.map((s) => s.name));

  return (
    <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-bold">Your subscriptions</p>
        <label className="flex items-center gap-2 text-sm font-semibold text-[#3d3d52]">
          Currency
          <select value={cur} onChange={(e) => setCur(e.target.value)} className="h-10 rounded-xl bg-[#faf8f4] px-3 ring-1 ring-black/10">
            {CURRENCIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 space-y-2">
        {subs.map((s) => (
          <div key={s.id} className="grid grid-cols-[1fr_6.5rem_auto] items-center gap-2 sm:grid-cols-[1fr_8rem_8rem_auto]">
            <input value={s.name} onChange={(e) => update(s.id, { name: e.target.value })} placeholder="Name" className="col-span-3 h-12 rounded-xl bg-[#faf8f4] px-4 ring-1 ring-black/10 outline-none focus:ring-2 focus:ring-[#10b981] sm:col-span-1" />
            <input value={s.price} onChange={(e) => update(s.id, { price: e.target.value })} placeholder={`${cur}0.00`} inputMode="decimal" className="h-12 rounded-xl bg-[#faf8f4] px-4 font-mono ring-1 ring-black/10 outline-none focus:ring-2 focus:ring-[#10b981]" />
            <select value={s.every} onChange={(e) => update(s.id, { every: e.target.value as Sub["every"] })} className="h-12 rounded-xl bg-[#faf8f4] px-3 ring-1 ring-black/10">
              <option value="week">per week</option>
              <option value="month">per month</option>
              <option value="year">per year</option>
            </select>
            <button onClick={() => setSubs((x) => x.filter((y) => y.id !== s.id))} aria-label="Remove" className="grid h-12 w-12 place-items-center rounded-xl text-[#6b6b80] hover:bg-rose-50 hover:text-rose-600">
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => add()} className="h-10 rounded-full bg-[#0f0f1a] px-4 text-sm font-bold text-white">
          + Add subscription
        </button>
        {SUGGESTIONS.filter((n) => !used.has(n)).map((n) => (
          <button key={n} onClick={() => add(n)} className="h-10 rounded-full bg-[#ecfdf5] px-4 text-sm font-semibold text-[#047857] hover:bg-[#d1fae5]">
            + {n}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          ["Per month", yearly / 12],
          ["Per year", yearly],
          ["Over 5 years", yearly * 5],
        ].map(([l, v], i) => (
          <div key={l as string} className={`rounded-2xl p-5 ${i === 1 ? "bg-[#047857] text-white" : "bg-[#ecfdf5]"}`}>
            <p className={`text-xs font-bold uppercase tracking-wider ${i === 1 ? "text-white/75" : "text-[#047857]"}`}>{l}</p>
            <p className="font-display mt-1 text-3xl font-extrabold tabular-nums">{money(v as number)}</p>
          </div>
        ))}
      </div>
      {yearly > 0 && <p className="mt-4 text-sm text-[#3d3d52]">Cancelling just one {money(yearly / Math.max(subs.length, 1) / 12)}/month subscription would save about {money(yearly / Math.max(subs.length, 1))} a year.</p>}
      <p className="mt-4 text-xs text-[#6b6b80]">Everything stays on this device. Nothing is sent anywhere.</p>
    </div>
  );
}
