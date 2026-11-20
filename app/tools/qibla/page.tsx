import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import Link from "next/link";
import QiblaFinder from "@/components/tools/QiblaFinder";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = withOg({
  title: { absolute: "Qibla Direction Finder: Find the Qibla From Your Location" },
  description: "Find the Qibla direction from anywhere: see the bearing to the Kaaba in Makkah, and use your phone's compass to face it. Free, no sign-up.",
  alternates: { canonical: "/tools/qibla/" },
}, "ilmai");

export default function QiblaPage() {
  return (
    <ToolShell
      path="/tools/qibla/"
      name="Qibla finder"
      eyebrow="Noor · free tool"
      title="Qibla direction"
      intro="Find the direction of the Kaaba in Makkah from where you are. On many phones you can use the live compass to face it."
      apps={["ilmai"]}
    >
      <QiblaFinder />
      <p className="mt-6 text-sm text-[#6b6b80]">
        The direction is calculated along the shortest path over the Earth (the great circle). Phone compasses can be affected by metal and magnets nearby. Also see{" "}
        <Link href="/tools/prayer-times/" className="font-semibold text-[#0f766e] underline">
          today's prayer times
        </Link>
        .
      </p>
      <section className="mt-10">
        <h2 className="font-display text-2xl font-extrabold">Qibla direction from major cities</h2>
        <p className="mt-2 text-[#3d3d52]">Bearings in degrees clockwise from true north, worked out the same way as the finder above.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {[
            ["London", "119°"],
            ["Berlin", "137°"],
            ["New York", "58°"],
            ["Toronto", "55°"],
            ["Dhaka", "278°"],
            ["Jakarta", "295°"],
            ["Sydney", "277°"],
          ].map(([c, b]) => (
            <div key={c} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5">
              <span className="font-semibold">{c}</span>
              <span className="font-mono text-[#0f766e]">{b}</span>
            </div>
          ))}
        </div>
      </section>
      <ToolFaq
        items={[
          { q: "How is the Qibla direction worked out?", a: "It's the direction of the shortest path over the Earth's surface (the great circle) from where you are to the Kaaba in Makkah, measured in degrees clockwise from true north." },
          { q: "Why doesn't the direction match a straight line on a flat map?", a: "Flat maps stretch the curved Earth, so the shortest route looks curved on them. That's why, for example, the Qibla from North America points north-east rather than south-east." },
          { q: "How do I get an accurate compass reading on my phone?", a: "Hold the phone flat, move away from metal objects, magnets and electronics, and calibrate the compass if asked, usually by moving the phone in a figure-of-eight. On iPhone, allow motion and orientation access when the page asks." },
          { q: "Is my location sent anywhere?", a: "No. The direction is calculated in your browser, and your location never leaves your device." },
        ]}
      />
    </ToolShell>
  );
}
