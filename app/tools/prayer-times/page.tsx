import type { Metadata } from "next";
import Link from "next/link";
import PrayerTimes from "@/components/tools/PrayerTimes";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = {
  title: { absolute: "Prayer Times Today: Fajr, Dhuhr, Asr, Maghrib & Isha" },
  description: "Free prayer times for your location: Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha. Choose your calculation method and Asr method. No sign-up.",
  alternates: { canonical: "/tools/prayer-times/" },
};

export default function PrayerTimesPage() {
  return (
    <ToolShell
      path="/tools/prayer-times/"
      name="Prayer times"
      eyebrow="Noor · free tool"
      title="Prayer times today"
      intro="Today's five daily prayer times for where you are, worked out on your device. Your location never leaves your phone or computer."
      apps={["ilmai"]}
    >
      <PrayerTimes />
      <p className="mt-6 text-sm text-[#6b6b80]">
        Times are calculated from the sun's position and may differ by a few minutes from your local mosque's timetable. Also see the{" "}
        <Link href="/tools/qibla/" className="font-semibold text-[#0f766e] underline">
          Qibla direction finder
        </Link>{" "}
        and the{" "}
        <Link href="/ilmai/ayah/" className="font-semibold text-[#0f766e] underline">
          Ayah of the day
        </Link>
        .
      </p>
    </ToolShell>
  );
}
