"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const WORDS: [string, string, string][] = [
  ["A", "Apple", "🍎"], ["B", "Ball", "⚽"], ["C", "Cat", "🐱"], ["D", "Dog", "🐶"], ["E", "Elephant", "🐘"],
  ["F", "Fish", "🐟"], ["G", "Grapes", "🍇"], ["H", "Hat", "🎩"], ["I", "Ice cream", "🍦"], ["J", "Juice", "🧃"],
  ["K", "Kite", "🪁"], ["L", "Lion", "🦁"], ["M", "Moon", "🌙"], ["N", "Nose", "👃"], ["O", "Orange", "🍊"],
  ["P", "Pig", "🐷"], ["Q", "Queen", "👸"], ["R", "Rainbow", "🌈"], ["S", "Sun", "☀️"], ["T", "Tree", "🌳"],
  ["U", "Umbrella", "☂️"], ["V", "Violin", "🎻"], ["W", "Whale", "🐳"], ["Y", "Yo-yo", "🪀"], ["Z", "Zebra", "🦓"],
];
const ROUNDS = 10;
const COLORS = ["#ff6b6b", "#f59e0b", "#10b981", "#4cc9f0", "#8b5cf6", "#ec4899"];

const pick = <T,>(a: T[], n: number) => [...a].sort(() => Math.random() - 0.5).slice(0, n);

function say(text: string) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.85;
    u.pitch = 1.2;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {
    /* no speech on this device */
  }
}

type Round = { answer: [string, string, string]; choices: [string, string, string][] };

function makeRound(): Round {
  const [answer, ...others] = pick(WORDS, 3);
  return { answer, choices: pick([answer, ...others], 3) };
}

// Letter Safari: hear a letter, tap the picture that starts with it. Big targets, sound, stars.
export default function LetterSafari({ playUrl }: { playUrl: string }) {
  const [round, setRound] = useState<Round | null>(null);
  const [n, setN] = useState(0);
  const [stars, setStars] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);
  const [cheer, setCheer] = useState(false);

  useEffect(() => setRound(makeRound()), []);

  if (!round) return <div className="h-[520px]" />;
  const [L, word] = round.answer;
  const done = n >= ROUNDS;

  const tap = (c: [string, string, string]) => {
    if (cheer) return;
    if (c[0] === L) {
      setCheer(true);
      setStars((s) => s + (wrong ? 0 : 1));
      say(`${L} is for ${word}!`);
      setTimeout(() => {
        setCheer(false);
        setWrong(null);
        setN((x) => x + 1);
        setRound(makeRound());
      }, 1400);
    } else {
      setWrong(c[1]);
      say(`That's ${c[1]}. Try again!`);
    }
  };

  if (done) {
    return (
      <div className="rounded-[2.5rem] bg-white p-10 text-center ring-1 ring-black/5">
        <p className="text-7xl">🏆</p>
        <h2 className="font-display mt-4 text-4xl font-extrabold">Amazing!</h2>
        <p className="mt-2 text-2xl">{"⭐".repeat(stars) || "🌟"}</p>
        <p className="mt-2 text-lg text-[#3d3d52]">
          {stars} out of {ROUNDS} first-try stars
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              setN(0);
              setStars(0);
              setRound(makeRound());
              track("kids_game_replay");
            }}
            className="h-14 rounded-full bg-[#ec4899] px-8 text-lg font-bold text-white shadow-lg"
          >
            Play again ↻
          </button>
          <a href={playUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center rounded-full bg-[#0f0f1a] px-8 text-lg font-bold text-white">
            More games in BrightKids
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-6 text-center ring-1 ring-black/5 sm:p-10">
      <div className="flex items-center justify-between text-lg font-bold">
        <span>
          {n + 1} / {ROUNDS}
        </span>
        <span>⭐ {stars}</span>
      </div>
      <button onClick={() => say(L)} aria-label={`Hear the letter ${L}`} className="mx-auto mt-4 block">
        <motion.span
          key={L + n}
          initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          className="font-display block text-[9rem] font-extrabold leading-none sm:text-[12rem]"
          style={{ color: COLORS[n % COLORS.length] }}
        >
          {L}
          <span className="text-[0.55em]">{L.toLowerCase()}</span>
        </motion.span>
        <span className="mt-1 block text-sm font-semibold text-[#6b6b80]">🔊 Tap to hear it</span>
      </button>
      <p className="font-display mt-4 text-2xl font-extrabold">Which one starts with {L}?</p>
      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-5">
        {round.choices.map((c) => (
          <motion.button
            key={c[1] + n}
            whileTap={{ scale: 0.9 }}
            animate={wrong === c[1] ? { x: [0, -10, 10, -6, 6, 0] } : {}}
            onClick={() => tap(c)}
            className={`flex aspect-square flex-col items-center justify-center rounded-[2rem] text-6xl transition-colors sm:text-8xl ${cheer && c[0] === L ? "bg-emerald-100 ring-4 ring-emerald-400" : wrong === c[1] ? "bg-rose-50" : "bg-[#fff5fa] hover:bg-[#ffe4f1]"}`}
          >
            {c[2]}
            {cheer && c[0] === L && <span className="mt-1 text-base font-bold text-emerald-700">{c[1]}</span>}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {cheer && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="pointer-events-none absolute inset-0 grid place-items-center text-8xl">
            🎉
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
