"use client";

import { useMemo, useState } from "react";
import { CurrencyPicker, Field, fmt, num } from "./MoneyField";

type Debt = { id: number; name: string; balance: string; apr: string; min: string };
type Result = { months: number; interest: number; order: string[]; stuck: boolean };

// Month-by-month payoff: minimums on every debt, then the extra (plus any freed-up minimums) on the target debt.
function simulate(debts: Debt[], extra: number, method: "avalanche" | "snowball"): Result {
  const list = debts
    .map((d) => ({ name: d.name || "Debt", bal: num(d.balance), rate: num(d.apr) / 100 / 12, min: num(d.min) }))
    .filter((d) => d.bal > 0);
  const budget = list.reduce((t, d) => t + d.min, 0) + extra;
  const order: string[] = [];
  let interest = 0;
  let months = 0;
  while (list.some((d) => d.bal > 0.005) && months < 600) {
    months++;
    for (const d of list) if (d.bal > 0) {
      const i = d.bal * d.rate;
      d.bal += i;
      interest += i;
    }
    let left = budget;
    for (const d of list) if (d.bal > 0) {
      const p = Math.min(d.min, d.bal, left);
      d.bal -= p;
      left -= p;
    }
    const open = list.filter((d) => d.bal > 0.005).sort((a, b) => (method === "avalanche" ? b.rate - a.rate || a.bal - b.bal : a.bal - b.bal || b.rate - a.rate));
    for (const d of open) {
      if (left <= 0) break;
      const p = Math.min(d.bal, left);
      d.bal -= p;
      left -= p;
    }
    for (const d of list) if (d.bal <= 0.005 && !order.includes(d.name)) {
      d.bal = 0;
      order.push(d.name);
    }
  }
  return { months, interest, order, stuck: months >= 600 };
}

const span = (m: number) => {
  const y = Math.floor(m / 12);
  const r = m % 12;
  return [y && `${y} year${y > 1 ? "s" : ""}`, r && `${r} month${r > 1 ? "s" : ""}`].filter(Boolean).join(" ") || "0 months";
};

// Debt payoff calculator comparing the avalanche (highest interest first) and snowball (smallest balance first) methods.
export default function DebtCalc() {
  const [cur, setCur] = useState("£");
  const [extra, setExtra] = useState("100");
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, name: "Credit card", balance: "3500", apr: "29.9", min: "105" },
    { id: 2, name: "Car loan", balance: "6000", apr: "7.9", min: "180" },
    { id: 3, name: "Store card", balance: "800", apr: "19.9", min: "25" },
  ]);
  const update = (id: number, patch: Partial<Debt>) => setDebts((d) => d.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const res = useMemo(
    () => ({ avalanche: simulate(debts, num(extra), "avalanche"), snowball: simulate(debts, num(extra), "snowball"), minOnly: simulate(debts, 0, "avalanche") }),
    [debts, extra],
  );
  const total = debts.reduce((t, d) => t + num(d.balance), 0);
  const tie = Math.abs(res.avalanche.interest - res.snowball.interest) < 1;
  const best = res.avalanche.interest <= res.snowball.interest ? "avalanche" : "snowball";

  return (
    <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-bold">Your debts</p>
        <CurrencyPicker value={cur} onChange={setCur} />
      </div>
      <div className="mt-4 space-y-3">
        <div className="hidden grid-cols-[1fr_7rem_6rem_7rem_3rem] gap-2 px-1 text-xs font-bold uppercase tracking-wider text-[#6b6b80] sm:grid">
          <span>Name</span>
          <span>Balance</span>
          <span>APR %</span>
          <span>Min / month</span>
          <span />
        </div>
        {debts.map((d) => (
          <div key={d.id} className="grid grid-cols-3 gap-2 rounded-2xl bg-[#faf8f4] p-3 sm:grid-cols-[1fr_7rem_6rem_7rem_3rem] sm:bg-transparent sm:p-0">
            <input aria-label="Debt name" value={d.name} onChange={(e) => update(d.id, { name: e.target.value })} placeholder="Name" className="col-span-3 h-11 w-full min-w-0 rounded-xl bg-white px-3 ring-1 ring-black/10 sm:col-span-1 sm:bg-[#faf8f4]" />
            <label className="block min-w-0">
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#6b6b80] sm:hidden">Balance</span>
              <input aria-label="Balance" value={d.balance} onChange={(e) => update(d.id, { balance: e.target.value })} inputMode="decimal" placeholder={`${cur} balance`} className="h-11 w-full min-w-0 rounded-xl bg-white px-3 font-mono ring-1 ring-black/10 sm:bg-[#faf8f4]" />
            </label>
            <label className="block min-w-0">
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#6b6b80] sm:hidden">APR %</span>
              <input aria-label="Interest rate (APR %)" value={d.apr} onChange={(e) => update(d.id, { apr: e.target.value })} inputMode="decimal" placeholder="APR %" className="h-11 w-full min-w-0 rounded-xl bg-white px-3 font-mono ring-1 ring-black/10 sm:bg-[#faf8f4]" />
            </label>
            <label className="block min-w-0">
              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-[#6b6b80] sm:hidden">Min / month</span>
              <input aria-label="Minimum monthly payment" value={d.min} onChange={(e) => update(d.id, { min: e.target.value })} inputMode="decimal" placeholder={`${cur} min`} className="h-11 w-full min-w-0 rounded-xl bg-white px-3 font-mono ring-1 ring-black/10 sm:bg-[#faf8f4]" />
            </label>
            <button onClick={() => setDebts((x) => x.filter((y) => y.id !== d.id))} aria-label={`Remove ${d.name || "debt"}`} className="col-span-3 h-11 rounded-xl text-[#6b6b80] hover:bg-rose-50 hover:text-rose-600 sm:col-span-1">
              ✕
            </button>
          </div>
        ))}
      </div>
      <button onClick={() => setDebts((d) => [...d, { id: Date.now(), name: "", balance: "", apr: "", min: "" }])} className="mt-4 h-10 rounded-full bg-[#0f0f1a] px-4 text-sm font-bold text-white">
        + Add a debt
      </button>
      <div className="mt-6 max-w-sm">
        <Field label="Extra you can pay each month" value={extra} onChange={setExtra} prefix={cur} hint="On top of all the minimum payments" />
      </div>

      {total > 0 && (
        <>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {(["avalanche", "snowball"] as const).map((m) => {
              const r = res[m];
              return (
                <div key={m} className={`rounded-2xl p-5 ${m === best ? "bg-[#047857] text-white" : "bg-[#ecfdf5]"}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider ${m === best ? "text-white/80" : "text-[#047857]"}`}>
                    {m === "avalanche" ? "Avalanche: highest interest first" : "Snowball: smallest balance first"}
                    {m === best && (tie ? " · same result" : ` · saves ${fmt(cur, Math.abs(res.avalanche.interest - res.snowball.interest))}`)}
                  </p>
                  {r.stuck ? (
                    <p className="mt-2 font-semibold">The payments don&apos;t cover the interest. Increase the payments to see a payoff date.</p>
                  ) : (
                    <>
                      <p className="font-display mt-1 text-3xl font-extrabold">{span(r.months)}</p>
                      <p className={m === best ? "text-white/85" : "text-[#3d3d52]"}>{fmt(cur, r.interest)} total interest</p>
                      <p className={`mt-2 text-sm ${m === best ? "text-white/75" : "text-[#6b6b80]"}`}>Paid off in this order: {r.order.join(" → ")}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          {!res.minOnly.stuck && !res.avalanche.stuck && num(extra) > 0 && (
            <p className="mt-4 text-[#3d3d52]">
              Without the extra payment, it would take {span(res.minOnly.months)} and cost {fmt(cur, res.minOnly.interest)} in interest. Your extra {fmt(cur, num(extra))} a month saves{" "}
              <strong className="text-[#047857]">{fmt(cur, res.minOnly.interest - res[best].interest)}</strong> and {span(res.minOnly.months - res[best].months)}.
            </p>
          )}
        </>
      )}
      <p className="mt-4 text-xs text-[#6b6b80]">An estimate, assuming fixed interest rates and payments, with interest added monthly. Your lender&apos;s figures may differ. Nothing leaves this device.</p>
    </div>
  );
}
