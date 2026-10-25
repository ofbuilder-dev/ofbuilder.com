"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { QuizQuestion } from "@/lib/questions";

export type QuizProps = {
  mode: "practice" | "mock";
  questions: QuizQuestion[];
  color: string;
  appName: string;
  playUrl: string;
  premiumCount: number;
  storageKey: string;
  // mock only
  count?: number;
  minutes?: number | null;
  passMark?: number;
  title?: string;
  onExit?: () => void;
};

type Shown = QuizQuestion & { text: string };

function shuffle<T>(a: T[]) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function prepare(qs: QuizQuestion[], mode: QuizProps["mode"], count?: number): Shown[] {
  const list = mode === "mock" ? shuffle(qs).slice(0, count ?? qs.length) : qs;
  // Pick one of the question's wording variants so repeat attempts feel fresh.
  return list.map((q) => ({ ...q, text: q.variants[Math.floor(Math.random() * q.variants.length)] ?? q.question }));
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function readBest(key: string): number | null {
  try {
    const v = localStorage.getItem(key);
    return v ? Number(v) : null;
  } catch {
    return null;
  }
}

function saveBest(key: string, pct: number) {
  try {
    const prev = readBest(key);
    if (prev === null || pct > prev) localStorage.setItem(key, String(pct));
  } catch {
    /* storage unavailable: best score just isn't remembered */
  }
}

export default function Quiz(p: QuizProps) {
  const [phase, setPhase] = useState<"intro" | "run" | "done">(p.mode === "practice" ? "run" : "intro");
  // Deterministic first render (no shuffling) so server and client markup match; shuffled after mount.
  const [items, setItems] = useState<Shown[]>(() => p.questions.slice(0, p.count ?? p.questions.length).map((q) => ({ ...q, text: q.variants[0] ?? q.question })));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [left, setLeft] = useState((p.minutes ?? 0) * 60);
  const [best, setBest] = useState<number | null>(null);
  const started = useRef<number>(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => setBest(readBest(p.storageKey)), [p.storageKey]);

  // Re-shuffle client-side after mount so server and client markup match.
  useEffect(() => {
    setItems(prepare(p.questions, p.mode, p.count));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    setElapsed(Math.round((Date.now() - started.current) / 1000));
    setPhase("done");
  };

  useEffect(() => {
    if (p.mode !== "mock" || phase !== "run" || !p.minutes) return;
    if (left <= 0) {
      finish();
      return;
    }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, phase]);

  const score = useMemo(() => items.filter((q) => answers[q.id] === q.correct).length, [items, answers]);
  const pass = p.mode === "mock" ? score >= (p.passMark ?? Math.ceil(items.length * 0.75)) : score >= Math.ceil(items.length * 0.75);

  useEffect(() => {
    if (phase === "done" && items.length) {
      const pct = Math.round((score / items.length) * 100);
      saveBest(p.storageKey, pct);
      setBest(readBest(p.storageKey));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const start = () => {
    setItems(prepare(p.questions, p.mode, p.count));
    setAnswers({});
    setIdx(0);
    setLeft((p.minutes ?? 0) * 60);
    started.current = Date.now();
    setPhase("run");
  };

  useEffect(() => {
    if (phase === "run") started.current = started.current || Date.now();
  }, [phase]);

  const q = items[idx];
  const chosen = q ? answers[q.id] : undefined;
  const revealed = p.mode === "practice" && chosen !== undefined;
  const answeredCount = Object.keys(answers).length;

  // ── Intro (mock) ─────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="rounded-[2rem] bg-white p-6 text-center ring-1 ring-black/5 sm:p-12">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{p.title ?? "Free mock test"}</h2>
        <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-2 sm:gap-3">
          {[
            [String(items.length), "questions"],
            [p.minutes ? `${p.minutes} min` : "No limit", "time"],
            [`${p.passMark}/${items.length}`, "to pass"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-2xl px-2 py-4 sm:p-4" style={{ background: p.color + "12" }}>
              <div className="font-display whitespace-nowrap text-xl font-extrabold sm:text-2xl" style={{ color: p.color }}>
                {v}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#6b6b80]">{l}</div>
            </div>
          ))}
        </div>
        {best !== null && <p className="mt-6 text-sm font-semibold text-[#6b6b80]">Your best score: {best}%</p>}
        <button onClick={start} className="mt-8 inline-flex h-14 items-center rounded-full px-8 text-base font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95" style={{ background: p.color }}>
          Start mock test →
        </button>
        <p className="mt-4 text-xs text-[#6b6b80]">Free, no sign-up. Questions are shuffled every time.</p>
      </div>
    );
  }

  // ── Results ──────────────────────────────────────────────
  if (phase === "done") {
    const pct = items.length ? Math.round((score / items.length) * 100) : 0;
    return (
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-[2rem] p-8 text-center text-white sm:p-12" style={{ background: pass ? `linear-gradient(135deg, ${p.color}, #10b981)` : `linear-gradient(135deg, ${p.color}, #0f0f1a)` }}>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">{p.mode === "mock" ? (pass ? "Passed 🎉" : "Not quite yet") : "Practice complete"}</p>
          <div className="font-display mt-3 text-7xl font-extrabold">
            {score}/{items.length}
          </div>
          <p className="mt-2 text-lg font-semibold text-white/90">
            {pct}%{p.mode === "mock" && p.passMark ? ` · pass mark ${p.passMark}/${items.length}` : ""}
            {p.mode === "mock" && elapsed ? ` · ${fmt(elapsed)}` : ""}
          </p>
          {best !== null && <p className="mt-1 text-sm text-white/75">Best score: {best}%</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={p.playUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center rounded-full bg-white px-7 font-bold text-[#0f0f1a] shadow-lg transition-transform hover:-translate-y-0.5">
              ▶ Get {p.premiumCount > 0 ? `${p.premiumCount}+ more questions` : "the full app"} free on Google Play
            </a>
            <button onClick={p.mode === "mock" ? start : p.onExit ?? start} className="inline-flex h-14 items-center rounded-full px-7 font-bold text-white ring-1 ring-white/40 transition-colors hover:bg-white/10">
              {p.mode === "mock" ? "Try again" : "Choose another topic"}
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-8">
          <h3 className="font-display text-2xl font-extrabold">Review your answers</h3>
          <ol className="mt-6 space-y-4">
            {items.map((it, i) => {
              const a = answers[it.id];
              const ok = a === it.correct;
              return (
                <li key={it.id} className="rounded-2xl p-5 ring-1" style={{ background: ok ? "#ecfdf5" : "#fff1f2", ["--tw-ring-color" as string]: ok ? "#a7f3d0" : "#fecdd3" }}>
                  <p className="font-semibold">
                    {i + 1}. {it.text}
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-bold text-emerald-700">✓ {it.options[it.correct]}</span>
                    {!ok && <span className="ml-3 text-rose-700">{a === undefined ? "Not answered" : `✗ You chose: ${it.options[a]}`}</span>}
                  </p>
                  {it.explanation && <p className="mt-2 text-sm leading-relaxed text-[#3d3d52]">{it.explanation}</p>}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }

  if (!q) return null;

  // ── Question ─────────────────────────────────────────────
  return (
    <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-10">
      <div className="flex items-center justify-between gap-4 text-sm font-semibold text-[#6b6b80]">
        <span>
          Question {idx + 1} of {items.length}
        </span>
        {p.mode === "mock" && p.minutes ? (
          <span className={`rounded-full px-3 py-1 tabular-nums ${left < 60 ? "bg-rose-100 text-rose-700" : "bg-black/5"}`}>⏱ {fmt(left)}</span>
        ) : (
          <span>{p.mode === "mock" ? `${answeredCount}/${items.length} answered` : `Score ${score}`}</span>
        )}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/5">
        <motion.div className="h-full rounded-full" style={{ background: p.color }} animate={{ width: `${((idx + 1) / items.length) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={q.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
          <h2 className="font-display mt-8 text-2xl font-extrabold leading-snug sm:text-3xl">{q.text}</h2>
          <div className="mt-6 space-y-3">
            {q.options.map((opt, i) => {
              const isChosen = chosen === i;
              const isRight = i === q.correct;
              let style: React.CSSProperties = {};
              let cls = "ring-1 ring-black/10 hover:ring-2";
              if (revealed && isRight) {
                cls = "ring-2 ring-emerald-500";
                style = { background: "#ecfdf5" };
              } else if (revealed && isChosen) {
                cls = "ring-2 ring-rose-500";
                style = { background: "#fff1f2" };
              } else if (!revealed && isChosen) {
                cls = "ring-2";
                style = { background: p.color + "14", ["--tw-ring-color" as string]: p.color };
              }
              return (
                <button
                  key={i}
                  disabled={revealed}
                  onClick={() => setAnswers((s) => ({ ...s, [q.id]: i }))}
                  className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left font-medium transition-all ${cls}`}
                  style={style}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black/5 text-sm font-bold">{revealed && isRight ? "✓" : revealed && isChosen ? "✗" : "ABCDEF"[i]}</span>
                  {opt}
                </button>
              );
            })}
          </div>
          {revealed && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-2xl p-5" style={{ background: chosen === q.correct ? "#ecfdf5" : "#fff7ed" }}>
              <p className="font-bold">{chosen === q.correct ? "Correct! ✓" : `The answer is: ${q.options[q.correct]}`}</p>
              {q.explanation && <p className="mt-1 text-[#3d3d52]">{q.explanation}</p>}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {p.mode === "mock" ? (
          <button onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0} className="h-12 rounded-full px-5 font-semibold text-[#3d3d52] ring-1 ring-black/10 disabled:opacity-40">
            ← Previous
          </button>
        ) : (
          <button onClick={p.onExit} className="h-12 rounded-full px-5 font-semibold text-[#3d3d52] ring-1 ring-black/10">
            ← Topics
          </button>
        )}
        <div className="flex gap-3">
          {p.mode === "mock" && idx < items.length - 1 && (
            <button onClick={finish} className="h-12 rounded-full px-5 font-semibold text-[#3d3d52] ring-1 ring-black/10">
              Finish test
            </button>
          )}
          {idx < items.length - 1 ? (
            <button
              onClick={() => setIdx((i) => i + 1)}
              disabled={p.mode === "practice" && !revealed}
              className="h-12 rounded-full px-6 font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-40"
              style={{ background: p.color }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={finish}
              disabled={p.mode === "practice" && !revealed}
              className="h-12 rounded-full px-6 font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-40"
              style={{ background: p.color }}
            >
              See results
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
