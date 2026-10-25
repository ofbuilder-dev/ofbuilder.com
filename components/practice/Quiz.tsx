"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { QuizQuestion } from "@/lib/questions";
import { track } from "@/lib/analytics";
import AppUpsell from "./AppUpsell";
import ShareResult from "./ShareResult";

export type QuizProps = {
  mode: "practice" | "mock" | "ready"; // ready = short readiness check with a per-topic breakdown
  questions: QuizQuestion[];
  color: string;
  appName: string;
  appIcon: string;
  rating?: number;
  playUrl: string;
  premiumCount: number;
  storageKey: string;
  // mock only
  count?: number;
  minutes?: number | null;
  passMark?: number;
  title?: string;
  onExit?: () => void;
  // sharing and readiness
  slug?: string;
  examName?: string;
  sharePath?: string;
  topicLabels?: Record<string, string>;
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

// Readiness check: deal questions round-robin across topics so every topic is covered.
function spread(qs: QuizQuestion[], count: number) {
  const byTopic = new Map<string, QuizQuestion[]>();
  for (const q of shuffle(qs)) byTopic.set(q.topic, [...(byTopic.get(q.topic) ?? []), q]);
  const queues = shuffle([...byTopic.values()]);
  const out: QuizQuestion[] = [];
  while (out.length < count && queues.some((q) => q.length)) for (const q of queues) if (q.length && out.length < count) out.push(q.shift()!);
  return out;
}

function prepare(qs: QuizQuestion[], mode: QuizProps["mode"], count?: number): Shown[] {
  const list = mode === "mock" ? shuffle(qs).slice(0, count ?? qs.length) : mode === "ready" ? spread(qs, count ?? 10) : qs;
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
  const exam = p.mode !== "practice"; // mock and readiness: answers revealed only at the end
  const pass = p.mode === "mock" ? score >= (p.passMark ?? Math.ceil(items.length * 0.75)) : score >= Math.ceil(items.length * 0.75);

  useEffect(() => {
    if (phase === "done" && items.length) {
      const pct = Math.round((score / items.length) * 100);
      saveBest(p.storageKey, pct);
      setBest(readBest(p.storageKey));
      track(`${p.mode}_finish`, p.slug);
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
    track(`${p.mode}_start`, p.slug);
  };

  useEffect(() => {
    if (phase === "run") started.current = started.current || Date.now();
  }, [phase]);

  const q = items[idx];
  const chosen = q ? answers[q.id] : undefined;
  const revealed = !exam && chosen !== undefined;
  const answeredCount = Object.keys(answers).length;

  // ── Intro (mock) ─────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="relative overflow-hidden rounded-[2rem] bg-white p-6 text-center shadow-[0_30px_60px_-35px_rgba(15,15,26,0.35)] ring-1 ring-black/5 sm:p-12">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1.5" style={{ background: p.color }} />
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl text-3xl" style={{ background: p.color + "14" }}>
          {p.mode === "ready" ? "📊" : "⏱️"}
        </span>
        <h2 className="font-display mt-5 text-3xl font-extrabold sm:text-4xl">{p.title ?? "Free mock test"}</h2>
        <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-2 sm:gap-3">
          {(p.mode === "ready"
            ? [
                [String(items.length), "questions"],
                ["~3 min", "time"],
                ["Every", "topic covered"],
              ]
            : [
                [String(items.length), "questions"],
                [p.minutes ? `${p.minutes} min` : "No limit", "time"],
                [`${p.passMark}/${items.length}`, "to pass"],
              ]
          ).map(([v, l]) => (
            <div key={l} className="rounded-2xl px-2 py-4 sm:p-4" style={{ background: p.color + "12" }}>
              <div className="font-display whitespace-nowrap text-xl font-extrabold sm:text-2xl" style={{ color: p.color }}>
                {v}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#6b6b80]">{l}</div>
            </div>
          ))}
        </div>
        {best !== null && (
          <p className="mt-6 inline-flex rounded-full bg-black/[0.04] px-4 py-1.5 text-sm font-semibold text-[#3d3d52]">🏅 Your best score: {best}%</p>
        )}
<div className="mt-8">
        <button onClick={start} className="inline-flex h-14 items-center rounded-full px-8 text-base font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95" style={{ background: p.color }}>
          {p.mode === "ready" ? "Check my readiness →" : "Start mock test →"}
        </button>
        </div>
        <p className="mt-4 text-xs text-[#6b6b80]">Free, no sign-up. Questions are shuffled every time.</p>
      </div>
    );
  }

  // ── Results ──────────────────────────────────────────────
  if (phase === "done") {
    const pct = items.length ? Math.round((score / items.length) * 100) : 0;
    // Per-topic results for the readiness breakdown, weakest first.
    const topicRows = Object.entries(
      items.reduce<Record<string, { right: number; total: number }>>((acc, it) => {
        const t = (acc[it.topic] ??= { right: 0, total: 0 });
        t.total += 1;
        if (answers[it.id] === it.correct) t.right += 1;
        return acc;
      }, {}),
    )
      .map(([topic, r]) => ({ topic, label: p.topicLabels?.[topic] ?? topic, ...r, pct: Math.round((r.right / r.total) * 100) }))
      .sort((a, b) => a.pct - b.pct);
    const weak = topicRows.filter((t) => t.pct < 75).slice(0, 2);
    const exam_ = p.examName ?? p.appName;
    const card = {
      headline:
        p.mode === "ready"
          ? `I'm ${pct}% ready for the ${exam_}!`
          : pass
            ? `I passed the ${exam_} mock test! 🎉`
            : `I scored ${pct}% on the ${exam_} mock test`,
      big: p.mode === "ready" ? `${pct}%` : `${score}/${items.length}`,
      sub: p.mode === "ready" ? `${score} of ${items.length} correct · readiness check` : `${pct}%${p.passMark ? ` · pass mark ${p.passMark}/${items.length}` : ""}`,
      color: p.color,
      icon: p.appIcon,
      appName: p.appName,
    };
    return (
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-[2rem] p-8 text-center text-white sm:p-12" style={{ background: pass ? `linear-gradient(135deg, ${p.color}, #10b981)` : `linear-gradient(135deg, ${p.color}, #0f0f1a)` }}>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">
            {p.mode === "mock" ? (pass ? "Passed 🎉" : "Not quite yet") : p.mode === "ready" ? "Your readiness" : "Practice complete"}
          </p>
          <div className="font-display mt-3 text-7xl font-extrabold">{p.mode === "ready" ? `${pct}%` : `${score}/${items.length}`}</div>
          {p.mode === "ready" && (
            <p className="mt-2 text-lg font-semibold text-white/90">
              {pct >= 85 ? "You look ready. Try the full mock test to be sure." : pct >= 60 ? "Nearly there. A little more practice on your weak topics." : "A good start. Focus on your weakest topics first."}
            </p>
          )}
          {p.mode !== "ready" && (
            <p className="mt-2 text-lg font-semibold text-white/90">
              {pct}%{p.mode === "mock" && p.passMark ? ` · pass mark ${p.passMark}/${items.length}` : ""}
              {p.mode === "mock" && elapsed ? ` · ${fmt(elapsed)}` : ""}
            </p>
          )}
          {best !== null && <p className="mt-1 text-sm text-white/75">Best score: {best}%</p>}
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {exam && p.slug && (pass || pct >= 50) && <ShareResult card={card} path={p.sharePath ?? `/${p.slug}/`} slug={p.slug} />}
            <button onClick={exam ? start : p.onExit ?? start} className="inline-flex h-11 items-center rounded-full bg-white/15 px-5 text-sm font-bold text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-white/25">
              {exam ? "↻ Try again" : "← Another topic"}
            </button>
            <a href="#review" className="inline-flex h-11 items-center rounded-full px-5 text-sm font-bold text-white/90 ring-1 ring-white/30 transition-colors hover:bg-white/10">
              Review answers ↓
            </a>
          </div>
        </div>

        {p.mode === "ready" && (
          <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-8">
            <h3 className="font-display text-2xl font-extrabold">Your topics</h3>
            {weak.length > 0 && (
              <p className="mt-1 text-[#3d3d52]">
                Practise{" "}
                {weak.map((w, i) => (
                  <span key={w.topic}>
                    {i > 0 && " and "}
                    <b>{w.label}</b>
                  </span>
                ))}{" "}
                next.
              </p>
            )}
            <ul className="mt-6 space-y-4">
              {topicRows.map((t) => (
                <li key={t.topic}>
                  <div className="flex justify-between gap-4 text-sm font-semibold">
                    <span>{t.label}</span>
                    <span className="tabular-nums text-[#6b6b80]">
                      {t.right}/{t.total}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-black/5">
                    <div className="h-full rounded-full" style={{ width: `${Math.max(4, t.pct)}%`, background: t.pct >= 75 ? "#10b981" : t.pct >= 50 ? "#f59e0b" : "#f43f5e" }} />
                  </div>
                </li>
              ))}
            </ul>
            {p.slug && (
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`/${p.slug}/practice/`} className="inline-flex h-12 items-center rounded-full px-6 font-bold text-white" style={{ background: p.color }}>
                  Practise weak topics →
                </a>
                <a href={`/${p.slug}/mock-test/`} className="inline-flex h-12 items-center rounded-full px-6 font-bold ring-1 ring-black/10">
                  Take the full mock test
                </a>
              </div>
            )}
          </div>
        )}

        <AppUpsell
          appName={p.appName}
          icon={p.appIcon}
          color={p.color}
          playUrl={p.playUrl}
          premiumCount={p.premiumCount}
          rating={p.rating}
          headline={
            p.mode === "ready"
              ? pct >= 85
                ? "You're nearly ready. Lock it in."
                : "Close the gap faster with the full app."
              : p.mode === "mock"
              ? pass
                ? "Great score! Make sure you pass on the day."
                : `You're ${Math.max(1, (p.passMark ?? 0) - score)} correct ${Math.max(1, (p.passMark ?? 0) - score) === 1 ? "answer" : "answers"} away from passing.`
              : "Keep the momentum going."
          }
          sub={
            p.mode === "ready"
              ? "The app tracks every topic, brings back the questions you miss and tells you when you're ready to book."
              : p.mode === "mock"
              ? pass
                ? "Keep practising with fresh questions and unlimited mock tests until you pass every time."
                : "The full app helps you close the gap: it brings back your weak questions and tracks when you're ready."
              : "Practise every topic, sit unlimited mock tests and fix your mistakes in the full app."
          }
        />

        {p.mode === "mock" && pass && (
          <p className="text-center text-sm text-[#6b6b80]">
            Passed the real thing?{" "}
            <a href="/stories/" className="font-bold underline" style={{ color: p.color }}>
              Share your success story
            </a>
          </p>
        )}

        <div id="review" className="scroll-mt-28 rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-8">
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
          <span>{exam ? `${answeredCount}/${items.length} answered` : `Score ${score}`}</span>
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
        {exam ? (
          <button onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0} className="h-12 rounded-full px-5 font-semibold text-[#3d3d52] ring-1 ring-black/10 disabled:opacity-40">
            ← Previous
          </button>
        ) : (
          <button onClick={p.onExit} className="h-12 rounded-full px-5 font-semibold text-[#3d3d52] ring-1 ring-black/10">
            ← Topics
          </button>
        )}
        <div className="flex gap-3">
          {exam && idx < items.length - 1 && (
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
