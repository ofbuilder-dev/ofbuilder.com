"use client";

import { useState } from "react";
import type { QuizQuestion, Topic } from "@/lib/questions";
import Quiz from "./Quiz";

// Topic picker for free practice; each topic opens a short practice quiz with instant feedback.
export default function TopicPractice({
  topics,
  byTopic,
  color,
  appName,
  appIcon,
  rating,
  playUrl,
  premiumCount,
  slug,
}: {
  topics: Topic[];
  byTopic: Record<string, QuizQuestion[]>;
  color: string;
  appName: string;
  appIcon: string;
  rating?: number;
  playUrl: string;
  premiumCount: number;
  slug: string;
}) {
  const [topic, setTopic] = useState<string | null>(null);

  if (topic) {
    return (
      <Quiz
        key={topic}
        mode="practice"
        questions={byTopic[topic] ?? []}
        color={color}
        appName={appName}
        appIcon={appIcon}
        rating={rating}
        playUrl={playUrl}
        premiumCount={premiumCount}
        storageKey={`ofb-practice-${slug}-${topic}`}
        onExit={() => setTopic(null)}
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {topics.map((t, i) => (
        <button
          key={t.slug}
          onClick={() => setTopic(t.slug)}
          className="group flex items-center gap-4 rounded-[1.5rem] bg-white p-5 text-left ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl"
        >
          <span className="font-display grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-extrabold text-white" style={{ background: color }}>
            {i + 1}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-bold leading-snug">{t.label}</span>
            <span className="mt-1 block text-sm text-[#6b6b80]">
              {t.free} free questions{t.total > t.free ? ` · ${t.total - t.free}+ more in the app` : ""}
            </span>
          </span>
          <span className="text-lg transition-transform group-hover:translate-x-1" style={{ color }}>
            →
          </span>
        </button>
      ))}
    </div>
  );
}
