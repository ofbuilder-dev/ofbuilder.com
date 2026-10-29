import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Privacy policies", description: "Privacy policies for every OfBuilder app: what data each app collects, how it is used, and how to delete your account.", alternates: { canonical: "/privacy/" } };

const policies = [
  { name: "DreamNest AI", slug: "dreamnest-ai", emoji: "🌙" },
  { name: "SleepWise", slug: "sleepwise", emoji: "😴" },
  { name: "IlmAI", slug: "ilmai", emoji: "🕌" },
  { name: "Driving Theory Test UK", slug: "driving-theory", emoji: "🚗" },
  { name: "Passly (UK Theory Tests)", slug: "passly", emoji: "🚦" },
  { name: "Citizenship Test Prep", slug: "citizenship", emoji: "🏛️" },
  { name: "CompTIA Exam Prep (Security+, A+, Network+, CySA+)", slug: "comptia", emoji: "🛡️" },
  { name: "Mental Math Master", slug: "mental-math", emoji: "🧠" },
  { name: "ArrowGo", slug: "arrowgo", emoji: "🏹" },
  { name: "BrightKids", slug: "brightkids", emoji: "🦊" },
  { name: "Renu", slug: "renu", emoji: "🔄" },
  { name: "BudgetWise", slug: "budgetwise", emoji: "💰" },
];

export default function PrivacyPage() {
  return (
    <div className="relative">
      <Nav />
      <main className="mx-auto max-w-4xl px-5 pb-12 pt-40">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8b5cf6]">Legal</p>
          <h1 className="font-display mt-3 text-5xl font-extrabold sm:text-7xl">Privacy policies</h1>
          <p className="mt-4 text-lg text-[#3d3d52]">Pick an app to read its privacy policy.</p>
        </Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {policies.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.05}>
              <a href={`/privacy/${p.slug}/`} className="group flex items-center gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-lg">
                <span className="text-2xl transition-transform group-hover:scale-125">{p.emoji}</span>
                <span>
                  <span className="block font-semibold">{p.name}</span>
                  <span className="block text-xs text-[#6b6b80]">Privacy policy</span>
                </span>
                <span className="ml-auto text-[#6b6b80] transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
