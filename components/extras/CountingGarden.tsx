"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { NUMBER_WORDS, pick, say } from "./kidsGame";

const THINGS: [string, string][] = [
  ["🍎", "apples"], ["⭐", "stars"], ["🐞", "ladybirds"], ["🌸", "flowers"], ["🐟", "fish"],
  ["🦋", "butterflies"], ["🍓", "strawberries"], ["🎈", "balloons"], ["🐥", "chicks"], ["🍪", "cookies"],
];
const ROUNDS = 10;

type Round = { n: number; thing: [string, string]; choices: number[] };

function makeRound(max: number): Round {
  const n = 1 + Math.floor(Math.random() * max);
  const others = pick(Array.from({ length: max }, (_, i) => i + 1).filter((x) => x !== n), 2);
  return { n, thing: pick(THINGS, 1)[0], choices: pick([n, ...others], 3) };
}

// Counting Garden: count the pictures, tap the right number. Gets harder after 5 rounds.
export default function CountingGarden({ playUrl }: { playUrl: string }) {
  const [round, setRound] = useState<Round | null>(null);
  const [i, setI] = useState(0);
  const [stars, setStars] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const [cheer, setCheer] = useState(false);

  useEffect(() => setRound(makeRound(5)), []);
  if (!round) return <div className="h-[520px]" />;

  const next = () => {
    setCheer(false);
    setWrong(null);
    setI((x) => x + 1);
    setRound(makeRound(i + 1 >= 5 ? 10 : 5));
  };

  const tap = (c: number) => {
    if (cheer) return;
    if (c === round.n) {
      setCheer(true);
      if (wrong === null) setStars((s) => s + 1);
      say(`${NUMBER_WORDS[c]} ${round.thing[1]}! Well done!`);
      setTimeout(next, 1500);
    } else {
      setWrong(c);
      say("Let's count again!");
    }
  };

  if (i >= ROUNDS)
    return (
      <div className="rounded-[2.5rem] bg-white p-10 text-center ring-1 ring-black/5">
        <p className="text-7xl">🏆</p>
        <h2 className="font-display mt-4 text-4xl font-extrabold">Super counting!</h2>
        <p className="mt-2 text-2xl">{"⭐".repeat(stars) || "🌟"}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              setI(0);
              setStars(0);
              setRound(makeRound(5));
              track("kids_counting_replay");
            }}
            className="h-14 rounded-full bg-[#10b981] px-8 text-lg font-bold text-white shadow-lg"
          >
            Play again ↻
          </button>
          <a href={playUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center rounded-full bg-[#0f0f1a] px-8 text-lg font-bold text-white">
            More games in BrightKids
          </a>
        </div>
      </div>
    );

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-6 text-center ring-1 ring-black/5 sm:p-10">
      <div className="flex items-center justify-between text-lg font-bold">
        <span>
          {i + 1} / {ROUNDS}
        </span>
        <span>⭐ {stars}</span>
      </div>
      <button onClick={() => say(`How many ${round.thing[1]}?`)} className="mx-auto mt-2 block text-sm font-semibold text-[#6b6b80]">
        🔊 How many {round.thing[1]}?
      </button>
      <m.div key={i} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mx-auto mt-6 flex min-h-[200px] max-w-md flex-wrap content-center items-center justify-center gap-3 rounded-[2rem] bg-[#ecfdf5] p-5">
        {Array.from({ length: round.n }, (_, k) => (
          <m.span key={k} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: k * 0.06 }} className="text-4xl sm:text-5xl">
            {round.thing[0]}
          </m.span>
        ))}
      </m.div>
      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-5">
        {round.choices.map((c) => (
          <m.button
            key={`${i}-${c}`}
            whileTap={{ scale: 0.9 }}
            animate={wrong === c ? { x: [0, -10, 10, -6, 6, 0] } : {}}
            onClick={() => tap(c)}
            className={`font-display aspect-[4/3] rounded-[1.75rem] text-5xl font-extrabold transition-colors sm:text-6xl ${cheer && c === round.n ? "bg-emerald-100 text-emerald-700 ring-4 ring-emerald-400" : wrong === c ? "bg-rose-50 text-rose-400" : "bg-[#f0fdf4] text-[#0f0f1a] hover:bg-[#dcfce7]"}`}
          >
            {c}
          </m.button>
        ))}
      </div>
      <AnimatePresence>
        {cheer && (
          <m.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="pointer-events-none absolute inset-0 grid place-items-center text-8xl">
            🎉
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
