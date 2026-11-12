"use client";

import { useState } from "react";

export type ExamInfo = { slug: string; name: string; code: string; questions: string; minutes: string; pass: string };

// Pick a CompTIA exam to see its format and passing score, with a rough read on a practice-test percentage.
export default function CompTIAScores({ exams }: { exams: ExamInfo[] }) {
  const [i, setI] = useState(0);
  const [pct, setPct] = useState("");
  const e = exams[i];
  const p = parseFloat(pct);
  const band = !Number.isFinite(p) ? null : p >= 85 ? ["Looking ready", "Keep scoring this on fresh full-length practice exams, then book.", "bg-[#047857] text-white"] : p >= 75 ? ["Getting close", "Focus on your weakest domains and take a few more full practice exams.", "bg-[#fff7ed] text-[#7c2d12]"] : ["Not yet", "Keep studying by domain before you book. Practice scores usually rise quickly with focused review.", "bg-rose-50 text-[#881337]"];

  return (
    <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-10">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose an exam">
        {exams.map((x, k) => (
          <button key={x.slug} onClick={() => setI(k)} aria-pressed={k === i} className={`h-10 rounded-full px-4 text-sm font-bold ${k === i ? "bg-[#0f0f1a] text-white" : "bg-black/[0.05] text-[#3d3d52]"}`}>
            {x.name}
          </button>
        ))}
      </div>
      <h2 className="font-display mt-6 text-2xl font-extrabold">
        CompTIA {e.name} ({e.code})
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ["Passing score", e.pass],
          ["Questions", e.questions],
          ["Time", e.minutes],
        ].map(([l, v], k) => (
          <div key={l} className={`rounded-2xl p-5 ${k === 0 ? "bg-[#7c3aed] text-white" : "bg-[#f3efff]"}`}>
            <p className={`text-xs font-bold uppercase tracking-wider ${k === 0 ? "text-white/80" : "text-[#7c3aed]"}`}>{l}</p>
            <p className="font-display mt-1 text-2xl font-extrabold">{v}</p>
          </div>
        ))}
      </div>

      <label className="mt-8 block max-w-sm">
        <span className="text-sm font-semibold text-[#3d3d52]">Your latest practice test score (optional)</span>
        <span className="mt-1.5 flex h-12 items-center rounded-xl bg-[#faf8f4] px-4 ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-[#7c3aed]">
          <input value={pct} onChange={(ev) => setPct(ev.target.value)} inputMode="decimal" className="w-full bg-transparent font-mono outline-none" />
          <span className="text-[#6b6b80]">%</span>
        </span>
      </label>
      {band && (
        <div className={`mt-4 rounded-2xl p-5 ${band[2]}`}>
          <p className="font-bold">{band[0]}</p>
          <p className="mt-1 text-sm opacity-90">{band[1]}</p>
        </div>
      )}
      <p className="mt-4 text-xs text-[#6b6b80]">
        CompTIA uses scaled scores, so a practice percentage can&apos;t be turned into an exact exam score. Treat this as a rough guide. Check CompTIA&apos;s exam page for the current details before you book.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`/${e.slug}/mock-test/`} className="rounded-full bg-[#0f0f1a] px-5 py-3 text-sm font-bold text-white">
          Free {e.name} mock test →
        </a>
        <a href={`/${e.slug}/guide/`} className="rounded-full px-5 py-3 text-sm font-bold ring-1 ring-black/15">
          {e.name} exam guide
        </a>
      </div>
    </div>
  );
}
