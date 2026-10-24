import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Blobs from "@/components/ui/Blobs";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { contactEmail, playDeveloperUrl, socials } from "@/lib/apps";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with OfBuilder for app support, partnerships or press.",
};

const CARDS = [
  { icon: "LifeBuoy", title: "App support", body: "Questions or bugs in one of our apps? Tell us which app and what's happening.", subject: "App support", color: "#ff6b6b" },
  { icon: "Handshake", title: "Partnerships", body: "Schools, driving instructors, training providers and resellers are all welcome.", subject: "Partnership", color: "#4cc9f0" },
  { icon: "Newspaper", title: "Press", body: "Writing about indie apps or the studio? We'd love to chat.", subject: "Press", color: "#8b5cf6" },
];

export default function ContactPage() {
  return (
    <div className="relative">
      <Nav />
      <section className="relative overflow-hidden px-5 pb-16 pt-40">
        <Blobs opacity={0.35} fade />
        <Reveal className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff6b6b]">Contact</p>
          <h1 className="font-display mt-3 text-6xl font-extrabold sm:text-8xl">Say hello 👋</h1>
          <p className="mt-5 max-w-xl text-lg text-[#3d3d52]">
            We read every message. The fastest way to reach us is{" "}
            <a href={`mailto:${contactEmail}`} className="font-bold underline">
              {contactEmail}
            </a>
            .
          </p>
        </Reveal>
      </section>
      <section className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <a href={`mailto:${contactEmail}?subject=${encodeURIComponent(c.subject)}`} className="group block h-full rounded-[2rem] bg-white p-8 ring-1 ring-black/5 transition-all hover:-translate-y-2 hover:shadow-2xl">
              <span className="grid h-14 w-14 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:rotate-12" style={{ background: c.color }}>
                <Icon name={c.icon} size={26} />
              </span>
              <h2 className="mt-6 text-xl font-bold">{c.title}</h2>
              <p className="mt-2 text-[#3d3d52]">{c.body}</p>
              <span className="mt-6 inline-block font-semibold" style={{ color: c.color }}>
                Email us →
              </span>
            </a>
          </Reveal>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Reveal className="flex flex-wrap items-center gap-3">
          <span className="font-semibold text-[#6b6b80]">Find us on</span>
          {Object.entries(socials).map(([k, v]) => (
            <a key={k} href={v} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-4 py-2 text-sm font-semibold capitalize ring-1 ring-black/10 transition-transform hover:-translate-y-1">
              {k}
            </a>
          ))}
          <a href={playDeveloperUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#0f0f1a] px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-1">
            Google Play
          </a>
        </Reveal>
      </section>
      <Footer />
    </div>
  );
}
