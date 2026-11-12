import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import CompTIAScores, { type ExamInfo } from "@/components/tools/CompTIAScores";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = withOg({
  title: { absolute: "CompTIA Passing Scores: A+, Network+, Security+ & CySA+" },
  description: "CompTIA passing scores, question counts and time limits for A+ Core 1 and Core 2, Network+, Security+ and CySA+, plus a quick check of your practice score.",
  alternates: { canonical: "/tools/comptia-passing-scores/" },
}, "security-plus");

const EXAMS: ExamInfo[] = [
  { slug: "a-plus-core-1", name: "A+ Core 1", code: "220-1201", questions: "Up to 90", minutes: "90 minutes", pass: "675 / 900" },
  { slug: "a-plus-core-2", name: "A+ Core 2", code: "220-1202", questions: "Up to 90", minutes: "90 minutes", pass: "700 / 900" },
  { slug: "network-plus", name: "Network+", code: "N10-009", questions: "Up to 90", minutes: "90 minutes", pass: "720 / 900" },
  { slug: "security-plus", name: "Security+", code: "SY0-701", questions: "Up to 90", minutes: "90 minutes", pass: "750 / 900" },
  { slug: "cysa-plus", name: "CySA+", code: "CS0-004", questions: "See CompTIA", minutes: "See CompTIA", pass: "See CompTIA" },
];

const FAQ = [
  { q: "What is the passing score for Security+?", a: "Security+ SY0-701 needs 750 on a scale of 100 to 900. The exam has up to 90 questions in 90 minutes." },
  { q: "What is the passing score for Network+?", a: "Network+ N10-009 needs 720 on a scale of 100 to 900, with up to 90 questions in 90 minutes." },
  { q: "What are the A+ passing scores?", a: "A+ has two exams. Core 1 (220-1201) needs 675 and Core 2 (220-1202) needs 700, both on a scale of 100 to 900. You must pass both to earn A+." },
  { q: "Is a CompTIA scaled score the same as a percentage?", a: "No. CompTIA converts your raw result to a scaled score between 100 and 900, and questions can carry different weights, so 750 does not simply mean 83%. Use practice exams to judge readiness instead." },
  { q: "How long is a CompTIA certification valid?", a: "Three years. You can renew it through CompTIA's continuing education programme or by earning a higher certification." },
];

export default function CompTIAPassingScores() {
  return (
    <ToolShell
      path="/tools/comptia-passing-scores/"
      name="CompTIA passing scores"
      eyebrow="IT certification · free tool"
      title="CompTIA passing scores"
      intro="The passing score, number of questions and time limit for each CompTIA exam we cover. Enter a practice score for a quick read on whether you're ready."
      apps={["security-plus", "network-plus"]}
    >
      <CompTIAScores exams={EXAMS} />
      <section className="mt-10 overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-black/5">
        <table className="w-full text-left text-sm sm:text-base">
          <caption className="sr-only">CompTIA exam passing scores</caption>
          <thead className="bg-[#0f0f1a] text-white">
            <tr>
              <th className="p-3 sm:p-4">Exam</th>
              <th className="p-3 sm:p-4">Passing score</th>
              <th className="hidden p-3 sm:table-cell sm:p-4">Questions</th>
              <th className="hidden p-3 sm:table-cell sm:p-4">Time</th>
            </tr>
          </thead>
          <tbody>
            {EXAMS.map((e) => (
              <tr key={e.slug} className="border-t border-black/5">
                <td className="p-3 font-semibold sm:p-4">
                  {e.name} <span className="font-normal text-[#6b6b80]">{e.code}</span>
                </td>
                <td className="p-3 sm:p-4">{e.pass}</td>
                <td className="hidden p-3 sm:table-cell sm:p-4">{e.questions}</td>
                <td className="hidden p-3 sm:table-cell sm:p-4">{e.minutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <p className="mt-3 text-sm text-[#6b6b80]">CySA+ CS0-004 details can change, so check CompTIA&apos;s CySA+ page for the current question count, time and passing score.</p>
      <ToolFaq items={FAQ} />
    </ToolShell>
  );
}
