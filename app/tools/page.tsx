import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Blobs from "@/components/ui/Blobs";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Free IT Tools & CompTIA Cheat Sheets" },
  description: "Free tools for IT students: common port numbers, Security+ acronyms and an IPv4 subnet calculator. Built for CompTIA A+, Network+ and Security+ revision.",
  alternates: { canonical: "/tools/" },
};

const TOOLS = [
  { href: "/tools/subnet-calculator/", emoji: "🧮", title: "Subnet calculator", body: "Network, broadcast, mask and host range for any IPv4 address.", color: "#4cc9f0" },
  { href: "/tools/common-ports/", emoji: "🔌", title: "Common ports", body: "Every port number the CompTIA exams ask about, searchable.", color: "#8b5cf6" },
  { href: "/tools/security-plus-acronyms/", emoji: "🔐", title: "Security+ acronyms", body: "Searchable list of security acronyms and what they mean.", color: "#ff6b6b" },
];

export default function ToolsPage() {
  return (
    <div className="relative">
      <Nav />
      <section className="relative overflow-hidden px-5 pb-12 pt-40">
        <Blobs colors={["#8b5cf6", "#4cc9f0", "#10b981", "#ff6b6b"]} opacity={0.3} fade />
        <Reveal className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8b5cf6]">Free IT tools</p>
          <h1 className="font-display mt-3 text-5xl font-extrabold sm:text-7xl">
            Tools for <span className="text-rainbow">IT students.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#3d3d52]">Cheat sheets and calculators for CompTIA A+, Network+ and Security+ revision. Free, no sign-up.</p>
        </Reveal>
      </section>
      <main className="mx-auto grid max-w-6xl gap-4 px-5 pb-12 sm:grid-cols-3">
        {TOOLS.map((t, i) => (
          <Reveal key={t.href} delay={i * 0.06}>
            <Link href={t.href} className="group flex h-full flex-col rounded-[1.75rem] bg-white p-7 ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl">
              <span className="grid h-14 w-14 place-items-center rounded-2xl text-3xl transition-transform group-hover:rotate-6" style={{ background: t.color + "1f" }}>
                {t.emoji}
              </span>
              <h2 className="font-display mt-5 text-2xl font-extrabold">{t.title}</h2>
              <p className="mt-2 flex-1 text-[#3d3d52]">{t.body}</p>
              <span className="mt-5 text-sm font-bold" style={{ color: t.color }}>
                Open →
              </span>
            </Link>
          </Reveal>
        ))}
      </main>
      <Footer />
    </div>
  );
}
