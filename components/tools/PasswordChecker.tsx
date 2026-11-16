"use client";

import { useState } from "react";

// Some of the most common passwords and patterns. A match makes a password weak whatever its length.
const COMMON = ["password", "123456", "12345678", "123456789", "qwerty", "abc123", "111111", "letmein", "welcome", "admin", "iloveyou", "monkey", "dragon", "football", "baseball", "sunshine", "princess", "master", "shadow", "passw0rd", "p@ssword", "qwertyuiop", "1q2w3e4r", "zaq12wsx"];
const GUESSES_PER_SEC = 1e10; // a fast offline attack with modern hardware

function analyse(pw: string) {
  const lower = /[a-z]/.test(pw);
  const upper = /[A-Z]/.test(pw);
  const digit = /\d/.test(pw);
  const symbol = /[^A-Za-z0-9]/.test(pw);
  const pool = (lower ? 26 : 0) + (upper ? 26 : 0) + (digit ? 10 : 0) + (symbol ? 33 : 0);
  let bits = pw.length ? pw.length * Math.log2(Math.max(pool, 1)) : 0;
  const tips: string[] = [];
  const low = pw.toLowerCase();
  // Undo common look-alike swaps so "P@ssw0rd" is caught just like "password".
  const plain = low.replace(/[@4]/g, "a").replace(/0/g, "o").replace(/[1!|]/g, "i").replace(/3/g, "e").replace(/[$5]/g, "s").replace(/7/g, "t");
  // A common password counts against you when it's most of the password ("password123"),
  // not when it's one word inside a long random passphrase.
  if (COMMON.some((c) => (low.includes(c) || plain.includes(c.replace(/1/g, "i"))) && low.length - c.length < 8)) {
    bits = Math.min(bits, 10);
    tips.push("It contains a very common password. Attackers try these first.");
  }
  if (/(.)\1{2,}/.test(pw)) {
    bits *= 0.75;
    tips.push("Avoid repeated characters like “aaa”.");
  }
  if (/(0123|1234|2345|3456|4567|5678|6789|abcd|bcde|qwer|asdf|zxcv)/i.test(pw)) {
    bits *= 0.75;
    tips.push("Avoid sequences like “1234” or “qwer”.");
  }
  if (/(19|20)\d{2}$/.test(pw)) tips.push("Years at the end (like “1998”) are easy to guess.");
  if (pw.length < 12) tips.push("Use at least 12 characters. Length matters most.");
  if (!symbol || !digit || !upper) tips.push("Mix in capitals, numbers and symbols, or use a long passphrase of random words.");
  const seconds = Math.pow(2, bits) / 2 / GUESSES_PER_SEC;
  const level = bits < 28 ? 0 : bits < 45 ? 1 : bits < 65 ? 2 : 3;
  return { bits, seconds, level, tips, checks: { length: pw.length >= 12, lower, upper, digit, symbol } };
}

function duration(s: number) {
  if (s < 1) return "instantly";
  const units: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [365, "day"],
    [100, "year"],
  ];
  let v = s;
  for (const [n, name] of units) {
    if (v < n) return `${Math.round(v)} ${name}${Math.round(v) === 1 ? "" : "s"}`;
    v /= n;
  }
  return v < 1e6 ? `${Math.round(v).toLocaleString("en-GB")} centuries` : "millions of centuries";
}

const LEVELS = [
  ["Very weak", "#e11d48"],
  ["Weak", "#f97316"],
  ["Good", "#eab308"],
  ["Strong", "#10b981"],
];

// Random passphrase: 5 words from the EFF long word list (7,776 words, loaded only when asked) plus a number,
// using the browser's secure random numbers. The list is public, and it stays strong even if an attacker knows it.
let wordList: Promise<string[]> | null = null;
const loadWords = () =>
  (wordList ??= fetch("/data/eff-wordlist.json")
    .then((r) => r.json() as Promise<string[]>)
    .catch((e) => {
      wordList = null; // let the next click try again
      throw e;
    }));
const pick = (n: number) => {
  // Rejection sampling keeps every choice equally likely.
  const max = Math.floor(0x100000000 / n) * n;
  const r = new Uint32Array(1);
  do crypto.getRandomValues(r);
  while (r[0] >= max);
  return r[0] % n;
};
async function passphrase() {
  const words = await loadWords();
  const chosen = Array.from({ length: 5 }, () => words[pick(words.length)]);
  return `${chosen.map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w)).join("-")}-${10 + pick(90)}`;
}

export default function PasswordChecker() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const a = analyse(pw);
  const [label, color] = LEVELS[a.level];

  return (
    <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-10">
      <label className="text-sm font-semibold text-[#3d3d52]">
        Type a password to test
        <div className="relative mt-1.5">
          <input
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            type={show ? "text" : "password"}
            autoComplete="off"
            spellCheck={false}
            className="block h-14 w-full rounded-2xl bg-[#faf8f4] px-5 pr-20 font-mono text-lg ring-1 ring-black/10 outline-none focus:ring-2 focus:ring-[#8b5cf6]"
          />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1.5 text-sm font-bold text-[#6b6b80] hover:bg-black/5">
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </label>
      <p className="mt-2 text-xs font-semibold text-[#047857]">🔒 Checked on your device. Your password is never sent or saved.</p>

      {pw && (
        <>
          <div className="mt-6 flex items-center justify-between">
            <span className="font-display text-2xl font-extrabold" style={{ color }}>
              {label}
            </span>
            <span className="text-sm text-[#6b6b80]">about {Math.round(a.bits)} bits</span>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {LEVELS.map((_, i) => (
              <div key={i} className="h-2.5 rounded-full" style={{ background: i <= a.level ? color : "#0000000f" }} />
            ))}
          </div>
          <p className="mt-5 rounded-2xl bg-[#faf8f4] p-4 text-[#3d3d52]">
            Estimated time to crack in a fast offline attack: <b className="text-[#0f0f1a]">{duration(a.seconds)}</b>
          </p>
          <ul className="mt-4 grid gap-1.5 text-sm sm:grid-cols-2">
            {[
              [a.checks.length, "12+ characters"],
              [a.checks.lower, "Lowercase letters"],
              [a.checks.upper, "Capital letters"],
              [a.checks.digit, "Numbers"],
              [a.checks.symbol, "Symbols"],
            ].map(([ok, t]) => (
              <li key={t as string} className={ok ? "text-emerald-700" : "text-[#6b6b80]"}>
                {ok ? "✓" : "○"} {t}
              </li>
            ))}
          </ul>
          {a.tips.length > 0 && (
            <ul className="mt-4 space-y-1.5 text-sm text-[#3d3d52]">
              {a.tips.map((t) => (
                <li key={t}>💡 {t}</li>
              ))}
            </ul>
          )}
        </>
      )}

      <div className="mt-8 rounded-2xl bg-[#f3efff] p-5">
        <p className="font-bold">Need a strong one?</p>
        <p className="mt-1 text-sm text-[#3d3d52]">Five random words and a number: long, strong and easy to remember. Made on your device from the EFF word list.</p>
        <button
          onClick={async () => {
            setBusy(true);
            try {
              setPw(await passphrase());
              setShow(true);
            } finally {
              setBusy(false);
            }
          }}
          disabled={busy}
          className="mt-3 h-11 rounded-full bg-[#7c3aed] px-5 text-sm font-bold text-white disabled:opacity-60"
        >
          {busy ? "Generating…" : "Generate a passphrase"}
        </button>
      </div>
    </div>
  );
}
