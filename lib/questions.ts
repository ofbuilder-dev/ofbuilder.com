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
  handbook_ref?: string;
  handbook_page?: number;
  difficulty?: string;
  frequency?: string;
  updated_year?: number;
  category?: string;
  is_premium: boolean;
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
  if (q.source_chapter) return q.source_chapter.replace(/^Chapter\s+\d+\s*[:.-]\s*/i, "");
  return q.topic_slug.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function toQuiz(q: RawQuestion): QuizQuestion {
  return {
    id: q.id,
    topic: q.topic_slug,
    question: q.question,
    variants: q.variants?.length ? q.variants : [q.question],
    options: q.options,
    correct: q.correct_index,
    explanation: q.explanation ?? "",
    chapter: q.source_chapter,
  };
}

export function loadPractice(slug: string) {
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
  for (const t of topics) byTopic[t.slug] = free.filter((q) => q.topic_slug === t.slug).slice(0, FREE_PER_TOPIC).map(toQuiz);

  return {
    ...PRACTICE[slug],
    topics,
    byTopic,
    mockPool: free.map(toQuiz),
    totalCount: raw.length,
    premiumCount: raw.length - free.length,
    // Placeholder banks (refs starting "SAMPLE") stay out of search engines until real data is added.
    isSample: raw.some((q) => q.ref?.startsWith("SAMPLE")),
  };
}

/** Play Store link tagged so installs from the website show up in Play Console's acquisition reports. */
export function trackedPlayUrl(playUrl: string, medium: string) {
  if (!playUrl.includes("details?id=")) return playUrl;
  const ref = encodeURIComponent(`utm_source=ofbuilder.com&utm_medium=${medium}`);
  return `${playUrl}&referrer=${ref}`;
}
