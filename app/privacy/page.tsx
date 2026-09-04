import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

const policies = [
  { name: "DreamNest AI", slug: "dreamnest-ai", emoji: "🌙" },
  { name: "SleepWise", slug: "sleepwise", emoji: "😴" },
  { name: "IlmAI", slug: "ilmai", emoji: "🕌" },
  { name: "Driving Theory Test", slug: "driving-theory", emoji: "🚗" },
  { name: "Mental Math Master", slug: "mental-math", emoji: "🧠" },
  { name: "Renu", slug: "renu", emoji: "🔄" },
  { name: "BudgetWise", slug: "budgetwise", emoji: "💰" },
  { name: "Passly (UK Theory Tests)", slug: "passly", emoji: "🚦" },
  { name: "ShishuAI", slug: "shishuai", emoji: "👶" },
];

export default function PrivacyPage() {
  return (
    <div className="relative">
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 pt-32 pb-24">
        <p className="text-sm font-medium text-[var(--brand)]">Legal</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Privacy Policies
        </h1>
        <p className="mt-3 text-[var(--text-dim)]">
          Select an app to view its privacy policy.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {policies.map((p) => (
            <a
              key={p.slug}
              href={`/privacy/${p.slug}/`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <span className="text-2xl">{p.emoji}</span>
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-[var(--text-faint)]">Privacy Policy</div>
              </div>
              <svg className="ml-auto text-[var(--text-faint)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
