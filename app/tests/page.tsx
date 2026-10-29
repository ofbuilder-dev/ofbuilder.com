import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Blobs from "@/components/ui/Blobs";
import Reveal from "@/components/ui/Reveal";
import { countries } from "@/lib/countries";

export const metadata: Metadata = {
  title: { absolute: "Free Practice Tests by Country: UK, US, Canada & More" },
  description: "Find free practice tests for your country: citizenship tests for the UK, US, Canada, Australia, Germany, Denmark and the Netherlands, plus UK theory tests.",
  alternates: { canonical: "/tests/" },
};

export default function CountriesPage() {
  return (
    <div className="relative">
      <Nav />
      <section className="relative overflow-hidden px-5 pb-12 pt-40">
        <Blobs opacity={0.35} fade />
        <Reveal className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#10b981]">Tests by country</p>
          <h1 className="font-display mt-3 text-5xl font-extrabold sm:text-7xl">
            Where are you <span className="text-rainbow">taking your test?</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#3d3d52]">Pick your country to see every free mock test, guide and study plan for it.</p>
        </Reveal>
      </section>
      <main className="mx-auto grid max-w-6xl gap-4 px-5 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.04}>
            <Link href={`/tests/${c.id}/`} className="group flex h-full flex-col rounded-[1.75rem] bg-white p-6 ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl">
              <span className="text-5xl">{c.flag}</span>
              <h2 className="font-display mt-4 text-2xl font-extrabold">{c.name}</h2>
              <p className="mt-1 flex-1 text-sm text-[#6b6b80]">
                {c.apps.length} free {c.apps.length === 1 ? "test" : "tests"}
              </p>
              <span className="mt-4 text-sm font-bold transition-transform group-hover:translate-x-1" style={{ color: c.color }}>
                See tests →
              </span>
            </Link>
          </Reveal>
        ))}
      </main>
      <Footer />
    </div>
  );
}
