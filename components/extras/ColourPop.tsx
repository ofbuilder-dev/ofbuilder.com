"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { pick, say } from "./kidsGame";

const COLOURS: [string, string][] = [
  ["red", "#ef4444"], ["blue", "#3b82f6"], ["green", "#22c55e"], ["yellow", "#facc15"],
  ["orange", "#f97316"], ["purple", "#a855f7"], ["pink", "#ec4899"],
];
const ROUNDS = 10;

type Round = { target: [string, string]; balloons: [string, string][] };

function makeRound(count: number): Round {
  const balloons = pick(COLOURS, count);
  return { target: balloons[Math.floor(Math.random() * balloons.length)], balloons };
}

function Balloon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 140" className="h-full w-full drop-shadow-md" aria-hidden>
      <ellipse cx="50" cy="52" rx="38" ry="46" fill={color} />
      <ellipse cx="36" cy="34" rx="9" ry="14" fill="#fff" opacity="0.35" />
      <path d="M45 97 L55 97 L50 106 Z" fill={color} />
      <path d="M50 106 C 44 118, 56 126, 50 138" stroke="#94a3b8" strokeWidth="2" fill="none" />
    </svg>
  );
}

// Colour Pop: hear a colour, pop the matching balloon. More balloons after 5 rounds.
export default function ColourPop({ playUrl }: { playUrl: string }) {
  const [round, setRound] = useState<Round | null>(null);
  const [i, setI] = useState(0);
  const [stars, setStars] = useState(0);
  const [wrong, setWrong] = useState<string | null>(null);
  const [popped, setPopped] = useState<string | null>(null);

  useEffect(() => setRound(makeRound(3)), []);
  useEffect(() => {
    if (round) say(`Pop the ${round.target[0]} balloon!`);
  }, [round]);
  if (!round) return <div className="h-[520px]" />;

  const tap = ([name]: [string, string]) => {
    if (popped) return;
    if (name === round.target[0]) {
      setPopped(name);
      if (wrong === null) setStars((s) => s + 1);
      say(`Pop! ${name}!`);
      setTimeout(() => {
        setPopped(null);
        setWrong(null);
        setI((x) => x + 1);
        setRound(makeRound(i + 1 >= 5 ? 4 : 3));
      }, 1300);
    } else {
      setWrong(name);
      say(`That's ${name}. Find ${round.target[0]}!`);
    }
  };

  if (i >= ROUNDS)
    return (
      <div className="rounded-[2.5rem] bg-white p-10 text-center ring-1 ring-black/5">
        <p className="text-7xl">🏆</p>
        <h2 className="font-display mt-4 text-4xl font-extrabold">Colour champion!</h2>
        <p className="mt-2 text-2xl">{"⭐".repeat(stars) || "🌟"}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              setI(0);
              setStars(0);
              setRound(makeRound(3));
              track("kids_colours_replay");
            }}
            className="h-14 rounded-full bg-[#a855f7] px-8 text-lg font-bold text-white shadow-lg"
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
      <button onClick={() => say(`Pop the ${round.target[0]} balloon!`)} className="font-display mx-auto mt-4 block text-3xl font-extrabold sm:text-4xl">
        Pop the <span style={{ color: round.target[1] }}>{round.target[0]}</span> balloon!
        <span className="mt-1 block text-sm font-semibold text-[#6b6b80]">🔊 Tap to hear it again</span>
      </button>
      <div className={`mt-8 grid gap-3 sm:gap-6 ${round.balloons.length === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
        {round.balloons.map((b) => (
          <AnimatePresence key={`${i}-${b[0]}`}>
            {popped === b[0] ? (
              <m.div initial={{ scale: 1 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ duration: 0.4 }} className="grid h-40 place-items-center text-6xl sm:h-52">
                💥
              </m.div>
            ) : (
              <m.button
                whileTap={{ scale: 0.9 }}
                animate={wrong === b[0] ? { x: [0, -10, 10, -6, 6, 0] } : { y: [0, -8, 0] }}
                transition={wrong === b[0] ? { duration: 0.4 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => tap(b)}
                aria-label={`${b[0]} balloon`}
                className="h-40 sm:h-52"
              >
                <Balloon color={b[1]} />
              </m.button>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
}
