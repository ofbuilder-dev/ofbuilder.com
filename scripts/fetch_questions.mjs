// Downloads the real citizenship question banks at build time and keeps only a small free subset
// for the website (the full bank stays in the apps). Run before `next build`:
//   node scripts/fetch_questions.mjs
// If a download fails or looks wrong, the existing file in content/questions/ is left untouched.
import fs from "fs";
import path from "path";

const BASE = process.env.QUESTIONS_BASE ?? "https://ezprrwlxbvqsffedjrbt.supabase.co/storage/v1/object/public";
const OUT = path.join(process.cwd(), "content", "questions");

// bucket file path → app slug, and the mock test length so the free pool can always fill one mock.
const BANKS = {
  "Citizenship/seed_data/uk/questions.json": ["life-in-the-uk", 24],
  "Citizenship/seed_data/us/questions.json": ["us-citizenship", 20],
  "Citizenship/seed_data/ca/questions.json": ["canadian-citizenship", 20],
  "Citizenship/seed_data/au/questions.json": ["australian-citizenship", 20],
  "Citizenship/seed_data/de/questions.json": ["german-citizenship", 33],
  "Citizenship/seed_data/dk/questions.json": ["danish-citizenship", 25],
  "Citizenship/seed_data/nl/questions.json": ["knm-inburgering", 25],
  "passly/seed/car/questions.json": ["driving-theory", 50],
  "passly/seed/motorcycle/questions.json": ["motorcycle-theory", 50],
  "passly/seed/lgv/questions.json": ["lgv-hgv-theory", 50],
  "passly/seed/pcv/questions.json": ["pcv-bus-theory", 50],
  "CompTIA/questions/a_plus_core1.json": ["a-plus-core-1", 30],
  "CompTIA/questions/a_plus_core2.json": ["a-plus-core-2", 30],
  "CompTIA/questions/network_plus.json": ["network-plus", 30],
  "CompTIA/questions/security_plus.json": ["security-plus", 30],
  "CompTIA/questions/cysa_plus.json": ["cysa-plus", 30],
};
const PER_TOPIC = 6; // matches FREE_PER_TOPIC in lib/questions.ts
const EXTRA = 16; // free questions beyond one mock, so repeat mocks vary a little

const valid = (q) =>
  q && typeof q.question === "string" && Array.isArray(q.options) && q.options.length >= 2 &&
  Number.isInteger(q.correct_index) && q.correct_index >= 0 && q.correct_index < q.options.length && q.topic_slug;

function pickFree(raw, mockSize) {
  // Banks without an is_premium flag: every valid question is eligible, but only a small slice is published.
  const flagged = raw.some((q) => typeof q?.is_premium === "boolean");
  const free = raw.filter((q) => valid(q) && (flagged ? q.is_premium === false : true)).map((q) => ({ ...q, is_premium: false }));
  const byTopic = new Map();
  for (const q of free) byTopic.set(q.topic_slug, [...(byTopic.get(q.topic_slug) ?? []), q]);
  const chosen = [];
  // First the topic-practice questions, then top up round-robin until a mock (plus a few) can be filled.
  for (const list of byTopic.values()) chosen.push(...list.slice(0, PER_TOPIC));
  const need = mockSize + EXTRA;
  const rest = [...byTopic.values()].map((l) => l.slice(PER_TOPIC));
  while (chosen.length < need && rest.some((l) => l.length)) for (const l of rest) if (l.length && chosen.length < need) chosen.push(l.shift());
  return chosen;
}

let failed = 0;
for (const [file, [slug, mockSize]] of Object.entries(BANKS)) {
  try {
    const res = await fetch(`${BASE}/${file}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const raw = Array.isArray(data) ? data : data.questions;
    if (!Array.isArray(raw) || !raw.length) throw new Error("no questions array");
    const free = pickFree(raw, mockSize);
    if (free.length < mockSize) throw new Error(`only ${free.length} usable free questions (need ${mockSize}); first question keys: ${Object.keys(raw[0] ?? {}).join(", ")}`);
    fs.writeFileSync(path.join(OUT, `${slug}.json`), JSON.stringify(free, null, 1) + "\n");
    fs.writeFileSync(path.join(OUT, `${slug}.meta.json`), JSON.stringify({ total: raw.length, source: file }) + "\n");
    const topics = new Set(free.map((q) => q.topic_slug)).size;
    console.log(`✓ ${slug}: ${raw.length} in bank, ${raw.filter((q) => q.is_premium === false).length} flagged free, ${free.length} published across ${topics} topics`);
  } catch (e) {
    failed++;
    console.warn(`! ${slug}: kept existing file (${e.message})`);
  }
}
if (failed) console.warn(`${failed} bank(s) not updated`);
