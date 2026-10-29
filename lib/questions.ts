// Free web practice for exam apps. Question banks live in content/questions/<app-slug>.json in the
// same format the apps use. Only questions with is_premium: false are ever sent to the browser.
import fs from "fs";
import path from "path";

export type RawQuestion = {
  id: number;
  ref: string;
  topic_id: number;
  topic_slug: string;
  subcategory?: string;
  question: string;
  variants?: string[];
  options: string[];
  correct_index: number;
  correct_option?: string;
  explanation?: string;
  source_chapter?: string;
  image_url?: string | null;
  handbook_ref?: string;
  handbook_page?: number;
  difficulty?: string;
  frequency?: string;
  updated_year?: number;
  category?: string;
  is_premium: boolean;
  // Translations, e.g. i18n.en for banks written in German, Danish or Dutch
  i18n?: Record<string, { text?: string; options?: string[]; variants?: string[]; explanation?: string }>;
};

/** The slim shape sent to the browser. */
export type QuizQuestion = {
  id: number;
  topic: string;
  question: string;
  variants: string[];
  options: string[];
  correct: number;
  explanation: string;
  chapter?: string;
  image?: string; // picture the question refers to, e.g. a coat of arms
};

export type Topic = { slug: string; label: string; free: number; total: number };

export type ExamFormat = {
  questions: number;
  minutes: number | null; // null = untimed
  passMark: number; // correct answers needed
  official: boolean; // true when this mirrors the real exam format
  note?: string;
};

// Exam formats for the mock test. Unofficial formats are labelled as practice formats on the page.
export const PRACTICE: Record<string, { exam: ExamFormat; examName: string }> = {
  "life-in-the-uk": { examName: "Life in the UK test", exam: { questions: 24, minutes: 45, passMark: 18, official: true } },
  "us-citizenship": {
    examName: "US citizenship civics test",
    exam: { questions: 20, minutes: null, passMark: 12, official: true, note: "Officers ask up to 20 civics questions at the interview; check uscis.gov for the version that applies to you." },
  },
  "canadian-citizenship": { examName: "Canadian citizenship test", exam: { questions: 20, minutes: 45, passMark: 15, official: true } },
  "australian-citizenship": {
    examName: "Australian citizenship test",
    exam: { questions: 20, minutes: 45, passMark: 15, official: true, note: "In the real test you must also answer all five Australian values questions correctly." },
  },
  "german-citizenship": { examName: "Einbürgerungstest", exam: { questions: 33, minutes: 60, passMark: 17, official: true } },
  "danish-citizenship": { examName: "Indfødsretsprøven", exam: { questions: 25, minutes: 30, passMark: 20, official: false } },
  "knm-inburgering": { examName: "KNM exam", exam: { questions: 25, minutes: 30, passMark: 18, official: false } },
  // UK theory tests (DVSA)
  "driving-theory": { examName: "UK Car Theory Test", exam: { questions: 50, minutes: 57, passMark: 43, official: true, note: "The real test also has a hazard perception part (pass mark 44 out of 75)." } },
  "motorcycle-theory": { examName: "UK Motorcycle Theory Test", exam: { questions: 50, minutes: 57, passMark: 43, official: true, note: "The real test also has a hazard perception part (pass mark 44 out of 75)." } },
  "lgv-hgv-theory": {
    examName: "UK LGV Theory Test",
    exam: { questions: 50, minutes: 57, passMark: 43, official: false, note: "This is a half-length practice mock. The real multiple-choice part has 100 questions in 1 hour 55 minutes, with a pass mark of 85." },
  },
  "pcv-bus-theory": {
    examName: "UK PCV Theory Test",
    exam: { questions: 50, minutes: 57, passMark: 43, official: false, note: "This is a half-length practice mock. The real multiple-choice part has 100 questions in 1 hour 55 minutes, with a pass mark of 85." },
  },
  // CompTIA: real exams are scored 100-900, so the free web mock is a shorter mini mock with an 80% target.
  "a-plus-core-1": { examName: "CompTIA A+ Core 1 (220-1201)", exam: { questions: 30, minutes: 30, passMark: 24, official: false, note: "Free mini mock. The real exam has up to 90 questions in 90 minutes and a passing score of 675 on a 100 to 900 scale." } },
  "a-plus-core-2": { examName: "CompTIA A+ Core 2 (220-1202)", exam: { questions: 30, minutes: 30, passMark: 24, official: false, note: "Free mini mock. The real exam has up to 90 questions in 90 minutes and a passing score of 700 on a 100 to 900 scale." } },
  "network-plus": { examName: "CompTIA Network+ (N10-009)", exam: { questions: 30, minutes: 30, passMark: 24, official: false, note: "Free mini mock. The real exam has up to 90 questions in 90 minutes and a passing score of 720 on a 100 to 900 scale." } },
  "security-plus": { examName: "CompTIA Security+ (SY0-701)", exam: { questions: 30, minutes: 30, passMark: 24, official: false, note: "Free mini mock. The real exam has up to 90 questions in 90 minutes and a passing score of 750 on a 100 to 900 scale." } },
  "cysa-plus": { examName: "CompTIA CySA+ (CS0-004)", exam: { questions: 30, minutes: 30, passMark: 24, official: false, note: "Free mini mock. Check CompTIA's exam page for the current question count, time limit and passing score." } },
};

/** Free questions shown per topic in topic practice. */
export const FREE_PER_TOPIC = 6;

export function hasPractice(slug: string) {
  return slug in PRACTICE && fs.existsSync(file(slug));
}

export const practiceSlugs = () => Object.keys(PRACTICE).filter(hasPractice);

function file(slug: string) {
  return path.join(process.cwd(), "content", "questions", `${slug}.json`);
}

function labelFor(q: RawQuestion) {
  if (q.source_chapter) return q.source_chapter.replace(/^(Chapter|Topic|Domain)\s+\d+(\.\d+)?\s*[:.-]\s*/i, "");
  return q.topic_slug.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// English pages use the English translation when the bank is written in another language;
// the translated pages (native = true) keep the original wording.
function toQuiz(raw: RawQuestion, native = false): QuizQuestion {
  const en = native ? undefined : raw.i18n?.en;
  const q = en?.text && en.options?.length === raw.options.length
    ? { ...raw, question: en.text, options: en.options, variants: en.variants?.length ? en.variants : [en.text], explanation: en.explanation ?? raw.explanation }
    : raw;
  return {
    id: q.id,
    topic: q.topic_slug,
    question: q.question,
    variants: q.variants?.length ? q.variants : [q.question],
    options: q.options,
    correct: q.correct_index,
    explanation: q.explanation ?? "",
    chapter: q.source_chapter,
    ...(imageUrl(q.image_url) ? { image: imageUrl(q.image_url) } : {}),
  };
}

// Only full image URLs are shown; relative paths (e.g. "de/maps/…") need their bucket location first.
function imageUrl(u?: string | null) {
  if (!u) return undefined;
  return /^https?:\/\//.test(u) ? u : undefined;
}

function bankSize(slug: string, fallback: number) {
  try {
    return (JSON.parse(fs.readFileSync(file(slug).replace(/\.json$/, ".meta.json"), "utf-8")) as { total: number }).total || fallback;
  } catch {
    return fallback;
  }
}

export function loadPractice(slug: string, { native = false }: { native?: boolean } = {}) {
  const quiz = (q: RawQuestion) => toQuiz(q, native);
  const raw = JSON.parse(fs.readFileSync(file(slug), "utf-8")) as RawQuestion[];
  const sorted = [...raw].sort((a, b) => a.topic_id - b.topic_id || a.id - b.id);
  const free = sorted.filter((q) => !q.is_premium);

  const topicMap = new Map<string, Topic & { order: number }>();
  for (const q of sorted) {
    const t = topicMap.get(q.topic_slug) ?? { slug: q.topic_slug, label: labelFor(q), free: 0, total: 0, order: q.topic_id };
    t.total += 1;
    if (!q.is_premium) t.free += 1;
    topicMap.set(q.topic_slug, t);
  }
  const topics = [...topicMap.values()].sort((a, b) => a.order - b.order).map(({ order: _o, ...t }) => ({ ...t, free: Math.min(t.free, FREE_PER_TOPIC) }));

  // Topic practice gets the first FREE_PER_TOPIC free questions of each topic; the mock draws from every free question.
  const byTopic: Record<string, QuizQuestion[]> = {};
  for (const t of topics) byTopic[t.slug] = free.filter((q) => q.topic_slug === t.slug).slice(0, FREE_PER_TOPIC).map(quiz);

  return {
    ...PRACTICE[slug],
    topics,
    byTopic,
    mockPool: free.map(quiz),
    totalCount: bankSize(slug, raw.length),
    // The website only ships a free slice; the meta file records how big the full in-app bank is.
    premiumCount: Math.max(0, bankSize(slug, raw.length) - free.length),
    // Placeholder banks (refs starting "SAMPLE") stay out of search engines until real data is added.
    isSample: raw.some((q) => q.ref?.startsWith("SAMPLE")),
  };
}

/** A capped slice of free questions for the Question of the Day, so pages stay light. */
export function dailyPool(slug: string, max = 60) {
  return loadPractice(slug).mockPool.slice(0, max);
}

/** Play Store link tagged so installs from the website show up in Play Console's acquisition reports. */
export function trackedPlayUrl(playUrl: string, medium: string) {
  if (!playUrl.includes("details?id=")) return playUrl;
  const ref = encodeURIComponent(`utm_source=ofbuilder.com&utm_medium=${medium}`);
  return `${playUrl}&referrer=${ref}`;
}
