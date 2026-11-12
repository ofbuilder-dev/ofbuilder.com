"use client";

import { useEffect, useMemo, useState } from "react";

const CAL = "en-u-ca-islamic-umalqura";
const MONTHS = ["Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani", "Jumada al-Ula", "Jumada al-Akhirah", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qadah", "Dhu al-Hijjah"];

// Hijri parts of a Gregorian date (Umm al-Qura calendar), read from the browser's own calendar data.
function toHijri(d: Date) {
  const parts = new Intl.DateTimeFormat(`${CAL}-nu-latn`, { day: "numeric", month: "numeric", year: "numeric", timeZone: "UTC" }).formatToParts(d);
  const get = (t: string) => parseInt(parts.find((p) => p.type === t)?.value ?? "0", 10);
  return { y: get("year"), m: get("month"), d: get("day") };
}

// Gregorian date for a Hijri date: start from an estimate and step day by day until the calendars match.
function fromHijri(y: number, m: number, d: number): Date | null {
  const epoch = Date.UTC(622, 6, 19);
  const guess = epoch + ((y - 1) * 354.36707 + (m - 1) * 29.530589 + (d - 1)) * 86400000;
  for (let off = -45; off <= 45; off++) {
    const t = new Date(guess + off * 86400000);
    const h = toHijri(t);
    if (h.y === y && h.m === m && h.d === d) return t;
  }
  return null;
}

const iso = (d: Date) => d.toISOString().slice(0, 10);
const long = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// Gregorian ⇄ Hijri date converter, both directions, with today's Hijri date.
export default function HijriConverter() {
  const [today, setToday] = useState<Date | null>(null);
  const [greg, setGreg] = useState("");
  const [hy, setHy] = useState("1448");
  const [hm, setHm] = useState("9");
  const [hd, setHd] = useState("1");

  useEffect(() => {
    const now = new Date();
    const t = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    setToday(t);
    setGreg(iso(t));
    setHy(String(toHijri(t).y));
  }, []);

  const h = useMemo(() => (greg ? toHijri(new Date(`${greg}T00:00:00Z`)) : null), [greg]);
  const g = useMemo(() => {
    const y = parseInt(hy, 10);
    const d = parseInt(hd, 10);
    return y > 0 && d >= 1 && d <= 30 ? fromHijri(y, parseInt(hm, 10), d) : null;
  }, [hy, hm, hd]);
  const th = today ? toHijri(today) : null;

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] bg-[#0f766e] p-6 text-white sm:p-10" aria-live="polite">
        <p className="text-xs font-bold uppercase tracking-wider text-white/75">Today in the Hijri calendar</p>
        <p className="font-display mt-1 text-4xl font-extrabold sm:text-5xl">{th ? `${th.d} ${MONTHS[th.m - 1]} ${th.y} AH` : "…"}</p>
        <p className="mt-1 text-white/80">{today ? long(today) : " "}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-8">
          <h2 className="font-display text-xl font-extrabold">Gregorian to Hijri</h2>
          <label className="mt-4 block">
            <span className="text-sm font-semibold text-[#3d3d52]">Gregorian date</span>
            <input type="date" value={greg} onChange={(e) => setGreg(e.target.value)} className="mt-1.5 h-12 w-full rounded-xl bg-[#faf8f4] px-4 ring-1 ring-black/10" />
          </label>
          <p className="mt-5 text-sm font-semibold text-[#6b6b80]">Hijri date</p>
          <p className="font-display text-2xl font-extrabold text-[#0f766e]">{h && h.y ? `${h.d} ${MONTHS[h.m - 1]} ${h.y} AH` : "—"}</p>
        </div>

        <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-8">
          <h2 className="font-display text-xl font-extrabold">Hijri to Gregorian</h2>
          <div className="mt-4 grid grid-cols-[4.5rem_1fr_5.5rem] gap-2">
            <label>
              <span className="text-sm font-semibold text-[#3d3d52]">Day</span>
              <input value={hd} onChange={(e) => setHd(e.target.value)} inputMode="numeric" className="mt-1.5 h-12 w-full rounded-xl bg-[#faf8f4] px-3 font-mono ring-1 ring-black/10" />
            </label>
            <label>
              <span className="text-sm font-semibold text-[#3d3d52]">Month</span>
              <select value={hm} onChange={(e) => setHm(e.target.value)} className="mt-1.5 h-12 w-full rounded-xl bg-[#faf8f4] px-2 ring-1 ring-black/10">
                {MONTHS.map((n, i) => (
                  <option key={n} value={i + 1}>
                    {i + 1}. {n}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="text-sm font-semibold text-[#3d3d52]">Year (AH)</span>
              <input value={hy} onChange={(e) => setHy(e.target.value)} inputMode="numeric" className="mt-1.5 h-12 w-full rounded-xl bg-[#faf8f4] px-3 font-mono ring-1 ring-black/10" />
            </label>
          </div>
          <p className="mt-5 text-sm font-semibold text-[#6b6b80]">Gregorian date</p>
          <p className="font-display text-2xl font-extrabold text-[#0f766e]">{g ? long(g) : "Not a valid date"}</p>
        </div>
      </div>
      <p className="text-xs text-[#6b6b80]">
        Uses the Umm al-Qura calendar. Dates that depend on moon sighting, such as the start of Ramadan or Eid, can differ by a day or two where you live, so follow your local mosque or authority.
      </p>
    </div>
  );
}
