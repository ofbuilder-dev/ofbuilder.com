"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import type { QuizQuestion } from "@/lib/questions";

export type DailySource = { slug: string; label: string; color: string; pool: QuizQuestion[]; icon?: string };

const KEY = "ofb-daily";
type Saved = { last?: string; streak?: number; answers?: Record<string, { day: string; choice: number }> };

const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const dayNumber = (d = new Date()) => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);

function read(): Saved {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Saved;
  } catch {
    return {};
  }
}
function write(s: Saved) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* streak just isn't remembered */
  }
}

// One question a day per exam, the same for everyone, with a streak that counts consecutive days answered.
export default function DailyQuestion({ sources, compact = false }: { sources: DailySource[]; compact?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);

  const src = sources[active];
  // Offset by exam so different exams don't all show question #n on the same day.
  const q = src ? src.pool[(dayNumber() + active * 7) % src.pool.length] : undefined;

  useEffect(() => {
    setMounted(true);
    const s = read();
    const today = dayKey();
    const y = new Date();
    y.setDate(y.getDate() - 1);
    // A streak only survives if the last answer was today or yesterday.
    setStreak(s.last === today || s.last === dayKey(y) ? (s.streak ?? 0) : 0);
  }, []);

  useEffect(() => {
    if (!src) return;
    const a = read().answers?.[src.slug];
    setChoice(a && a.day === dayKey() ? a.choice : null);
  }, [src]);

  if (!src || !q) return null;

  const answer = (i: number) => {
    if (choice !== null) return;
    setChoice(i);
    const s = read();
    const today = dayKey();
    const y = new Date();
    y.setDate(y.getDate() - 1);
    const next = s.last === today ? (s.streak ?? 1) : s.last === dayKey(y) ? (s.streak ?? 0) + 1 : 1;
    write({ last: today, streak: next, answers: { ...(s.answers ?? {}), [src.slug]: { day: today, choice: i } } });
    setStreak(next);
    track("daily_answer", src.slug);
  };

  const color = src.color;
  const done = choice !== null;

  return (
    <div className={`relative overflow-hidden rounded-[2rem] bg-white ring-1 ring-black/5 ${compact ? "p-6 sm:p-8" : "p-6 sm:p-10"}`}>
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl" style={{ background: color }} />
      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xl" style={{ background: color + "14" }}>
            💡
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color }}>
              Question of the day
            </p>
            <p className="text-sm text-[#6b6b80]">A new question every day</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {sources.length > 1 && (
            <label className="relative">
              <span className="sr-only">Choose an exam</span>
              <select
                value={active}
                onChange={(e) => setActive(Number(e.target.value))}
                className="h-10 max-w-[13rem] cursor-pointer appearance-none truncate rounded-full bg-black/[0.04] pl-4 pr-9 text-sm font-semibold text-[#0f0f1a] outline-none ring-1 ring-black/5 transition-colors hover:bg-black/[0.07] focus:ring-2"
              >
                {sources.map((s, i) => (
                  <option key={s.slug} value={i}>
                    {s.label}
                  </option>
                ))}
              </select>
              <span aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#6b6b80]">
                ▼
              </span>
            </label>
          )}
          <span className="inline-flex h-10 items-center rounded-full bg-orange-50 px-3.5 text-sm font-bold text-orange-600 ring-1 ring-orange-100" suppressHydrationWarning>
            🔥 {mounted ? streak : 0}
            <span className="ml-1 hidden font-semibold sm:inline">day streak</span>
          </span>
        </div>
      </div>

      {/* Rendered after mount so the day matches the visitor's own date. */}
      <div className={`relative mt-5 transition-opacity ${mounted ? "opacity-100" : "opacity-0"}`}>
        <h3 className="font-display mt-2 text-xl font-extrabold leading-snug sm:text-2xl">{mounted ? q.question : " "}</h3>
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:auto-rows-fr">
          {q.options.map((o, i) => {
            const right = i === q.correct;
            const picked = i === choice;
            const cls = !done
              ? "bg-[#fafafa] ring-1 ring-black/[0.06] hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:ring-black/10"
              : right
                ? "bg-emerald-50 ring-2 ring-emerald-500"
                : picked
                  ? "bg-rose-50 ring-2 ring-rose-400"
                  : "bg-[#fafafa] ring-1 ring-black/[0.04] opacity-50";
            return (
              <button key={i} onClick={() => answer(i)} disabled={done} className={`flex h-full items-center gap-3 rounded-2xl p-4 text-left text-[15px] font-medium transition-all ${cls}`}>
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${done && right ? "bg-emerald-500 text-white" : done && picked ? "bg-rose-400 text-white" : "bg-white text-[#3d3d52] ring-1 ring-black/10"}`}>{done && right ? "✓" : done && picked ? "✗" : "ABCDEF"[i]}</span>
                {o}
              </button>
            );
          })}
        </div>
        {done && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-2xl border-l-4 p-4" style={{ background: choice === q.correct ? "#ecfdf5" : "#fff7ed", borderColor: choice === q.correct ? "#10b981" : "#f59e0b" }}>
            <p className="font-bold">{choice === q.correct ? "Correct! See you tomorrow 👋" : `Not quite. The answer is: ${q.options[q.correct]}`}</p>
            {q.explanation && <p className="mt-1 text-sm text-[#3d3d52]">{q.explanation}</p>}
            <a href={`/${src.slug}/mock-test/`} className="mt-3 inline-block text-sm font-bold" style={{ color }}>
              Want more? Take the free mock test →
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
