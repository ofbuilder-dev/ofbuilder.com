import Link from "next/link";
import AppIcon from "@/components/ui/AppIcon";
import type { App } from "@/lib/apps";
import { guides } from "@/lib/guides";
import { loadPractice } from "@/lib/questions";

// One exam's free tests: mock test, readiness check, practice and the exam guide.
export default function TestCard({ app }: { app: App }) {
  const d = loadPractice(app.slug);
  const n = Math.min(d.exam.questions, d.mockPool.length);
  return (
    <div className="flex h-full flex-col rounded-[1.75rem] bg-white p-6 ring-1 ring-black/5 transition-shadow hover:shadow-xl">
      <div className="flex items-center gap-4">
        <AppIcon src={app.icon} name={app.shortName} size={56} />
        <div className="min-w-0">
          <h3 className="font-bold leading-snug">{d.examName}</h3>
          <p className="text-sm text-[#6b6b80]">
            {n} questions{d.exam.minutes ? ` · ${d.exam.minutes} min` : ""}
          </p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 text-sm font-bold">
        <Link href={`/${app.slug}/mock-test/`} className="col-span-2 rounded-xl px-4 py-3 text-center text-white" style={{ background: app.theme.primary }}>
          ⏱️ Free mock test
        </Link>
        <Link href={`/${app.slug}/readiness/`} className="rounded-xl px-3 py-2.5 text-center" style={{ background: app.theme.soft }}>
          📊 Am I ready?
        </Link>
        <Link href={`/${app.slug}/practice/`} className="rounded-xl px-3 py-2.5 text-center" style={{ background: app.theme.soft }}>
          🎯 Practice
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm font-semibold">
        {guides[app.slug] && (
          <Link href={`/${app.slug}/guide/`} style={{ color: app.theme.primary }}>
            📘 Exam guide & study plan →
          </Link>
        )}
        <Link href={`/${app.slug}/`} className="text-[#6b6b80] hover:text-[#0f0f1a]">
          About the app
        </Link>
      </div>
    </div>
  );
}
