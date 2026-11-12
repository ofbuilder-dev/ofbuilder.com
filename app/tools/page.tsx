import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Blobs from "@/components/ui/Blobs";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = withOg({
  title: { absolute: "Free Tools: Subnet, Sleep, Prayer Times & More" },
  description: "Free online tools: subnet calculator, port and acronym cheat sheets, password checker, stopping distances, sleep calculator, prayer times and more.",
  alternates: { canonical: "/tools/" },
});

type Tool = { href: string; emoji: string; title: string; body: string };
const GROUPS: { name: string; color: string; tools: Tool[] }[] = [
  {
    name: "IT & security",
    color: "#8b5cf6",
    tools: [
      { href: "/tools/subnet-calculator/", emoji: "🧮", title: "Subnet calculator", body: "Network, broadcast, mask and host range for any IPv4 address." },
      { href: "/tools/common-ports/", emoji: "🔌", title: "Common ports", body: "Every port number the CompTIA exams ask about, searchable." },
      { href: "/tools/security-plus-acronyms/", emoji: "🔐", title: "Security+ acronyms", body: "Searchable list of security acronyms and what they mean." },
      { href: "/tools/password-strength-checker/", emoji: "🛡️", title: "Password strength checker", body: "How strong is your password? Checked privately on your device." },
    ],
  },
  {
    name: "Driving",
    color: "#2563eb",
    tools: [{ href: "/tools/stopping-distances/", emoji: "🚗", title: "Stopping distances", body: "UK Highway Code stopping distances from 20 to 70 mph, wet and icy too." }],
  },
  {
    name: "Faith",
    color: "#0f766e",
    tools: [
      { href: "/tools/prayer-times/", emoji: "🕌", title: "Prayer times", body: "Today's Fajr, Dhuhr, Asr, Maghrib and Isha for your location." },
      { href: "/tools/qibla/", emoji: "🧭", title: "Qibla direction", body: "Find the direction of the Kaaba from wherever you are." },
      { href: "/tools/hijri-date-converter/", emoji: "📅", title: "Hijri date converter", body: "Today's Islamic date, and convert any date to or from the Hijri calendar." },
      { href: "/ilmai/ayah/", emoji: "🌙", title: "Ayah of the day", body: "A short Quran verse every day with its English meaning." },
    ],
  },
  {
    name: "Money & sleep",
    color: "#10b981",
    tools: [
      { href: "/tools/budget-calculator/", emoji: "📊", title: "50/30/20 budget calculator", body: "Split your take-home pay into needs, wants and savings." },
      { href: "/tools/debt-payoff-calculator/", emoji: "💳", title: "Debt payoff calculator", body: "Avalanche vs snowball: when you'll be debt-free and the interest you'll pay." },
      { href: "/tools/savings-goal-calculator/", emoji: "🎯", title: "Savings goal calculator", body: "How long to reach a goal, or how much to save each month." },
      { href: "/tools/subscription-calculator/", emoji: "💸", title: "Subscription calculator", body: "See what your subscriptions really cost per month and per year." },
      { href: "/tools/sleep-calculator/", emoji: "😴", title: "Sleep calculator", body: "The best time to go to bed or wake up, using 90-minute sleep cycles." },
    ],
  },
];

export default function ToolsPage() {
  return (
    <div className="relative">
      <Nav />
      <section className="relative overflow-hidden px-5 pb-12 pt-40">
        <Blobs colors={["#8b5cf6", "#4cc9f0", "#10b981", "#ff6b6b"]} opacity={0.3} fade />
        <Reveal className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7c3aed]">Free tools</p>
          <h1 className="font-display mt-3 text-5xl font-extrabold sm:text-7xl">
            Handy tools, <span className="text-rainbow">free forever.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#3d3d52]">Calculators and cheat sheets for study, driving, faith, money and sleep. Everything runs in your browser, no sign-up.</p>
        </Reveal>
      </section>
      <main className="mx-auto max-w-6xl space-y-14 px-5 pb-12">
        {GROUPS.map((g) => (
          <section key={g.name}>
            <h2 className="font-display text-3xl font-extrabold">{g.name}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {g.tools.map((t, i) => (
                <Reveal key={t.href} delay={i * 0.05}>
                  <Link href={t.href} className="group flex h-full flex-col rounded-[1.75rem] bg-white p-6 ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl text-3xl transition-transform group-hover:rotate-6" style={{ background: g.color + "1f" }}>
                      {t.emoji}
                    </span>
                    <h3 className="font-display mt-4 text-xl font-extrabold">{t.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-[#3d3d52]">{t.body}</p>
                    <span className="mt-4 text-sm font-bold" style={{ color: g.color }}>
                      Open →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
