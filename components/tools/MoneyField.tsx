"use client";

// Shared bits for the money calculators: currency picker and labelled number fields.
export const CURRENCIES = ["£", "$", "€", "₹", "৳", "A$", "C$"];

export const fmt = (cur: string, n: number, dp = 0) =>
  `${n < 0 ? "-" : ""}${cur}${Math.abs(n).toLocaleString(undefined, { minimumFractionDigits: dp, maximumFractionDigits: dp })}`;

export const num = (s: string) => {
  const n = parseFloat(s.replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};

export function CurrencyPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-[#3d3d52]">
      Currency
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-10 rounded-xl bg-[#faf8f4] px-3 ring-1 ring-black/10">
        {CURRENCIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </label>
  );
}

export function Field({ label, value, onChange, prefix, suffix, hint }: { label: string; value: string; onChange: (v: string) => void; prefix?: string; suffix?: string; hint?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#3d3d52]">{label}</span>
      <span className="mt-1.5 flex h-12 items-center rounded-xl bg-[#faf8f4] px-4 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-[#10b981]">
        {prefix && <span className="mr-1 text-[#6b6b80]">{prefix}</span>}
        <input value={value} onChange={(e) => onChange(e.target.value)} inputMode="decimal" className="w-full bg-transparent font-mono outline-none" />
        {suffix && <span className="ml-1 text-[#6b6b80]">{suffix}</span>}
      </span>
      {hint && <span className="mt-1 block text-xs text-[#6b6b80]">{hint}</span>}
    </label>
  );
}
