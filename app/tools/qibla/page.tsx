import type { Metadata } from "next";
import Link from "next/link";
import QiblaFinder from "@/components/tools/QiblaFinder";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = {
  title: { absolute: "Qibla Direction Finder: Find the Qibla From Your Location" },
  description: "Find the Qibla direction from anywhere: see the bearing to the Kaaba in Makkah, and use your phone's compass to face it. Free, no sign-up.",
  alternates: { canonical: "/tools/qibla/" },
};

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
    </ToolShell>
  );
}
