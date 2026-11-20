import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import Link from "next/link";
import PrayerTimes from "@/components/tools/PrayerTimes";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = withOg({
  title: { absolute: "Prayer Times Today: Fajr, Dhuhr, Asr, Maghrib & Isha" },
  description: "Free prayer times for your location: Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha. Choose your calculation method and Asr method. No sign-up.",
  alternates: { canonical: "/tools/prayer-times/" },
}, "ilmai");

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
      <section className="mt-10">
        <h2 className="font-display text-2xl font-extrabold">Which calculation method should I choose?</h2>
        <p className="mt-2 text-[#3d3d52]">Fajr and Isha are worked out from how far the sun is below the horizon, and organisations use slightly different angles. Choose the method your local mosque or community follows. If you're not sure, these are commonly used:</p>
        <div className="mt-4 overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-black/5">
          <table className="w-full text-left text-sm sm:text-base">
            <caption className="sr-only">Prayer time calculation methods</caption>
            <thead className="bg-[#0f0f1a] text-white">
              <tr>
                <th className="px-3 py-3 sm:px-4">Method</th>
                <th className="px-3 py-3 sm:px-4">Fajr</th>
                <th className="px-3 py-3 sm:px-4">Isha</th>
                <th className="hidden px-3 py-3 sm:table-cell sm:px-4">Often used in</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Muslim World League", "18°", "17°", "Europe, the Far East and many other regions"],
                ["ISNA", "15°", "15°", "North America"],
                ["Egyptian General Authority", "19.5°", "17.5°", "Africa and parts of the Middle East"],
                ["Umm al-Qura, Makkah", "18.5°", "90 min after Maghrib", "The Arabian Peninsula"],
                ["University of Islamic Sciences, Karachi", "18°", "18°", "Pakistan, Bangladesh, India and nearby"],
              ].map(([m, f, i, w], k) => (
                <tr key={m} className={k % 2 ? "bg-[#faf8f4]" : ""}>
                  <td className="px-3 py-3 font-semibold sm:px-4">{m}</td>
                  <td className="px-3 py-3 sm:px-4">{f}</td>
                  <td className="px-3 py-3 sm:px-4">{i}</td>
                  <td className="hidden px-3 py-3 text-[#3d3d52] sm:table-cell sm:px-4">{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[#3d3d52]">
          <strong className="text-[#0f0f1a]">Asr:</strong> the standard method (Shafi&apos;i, Maliki and Hanbali) begins Asr when an object&apos;s shadow equals its length. The Hanafi method waits until the shadow is twice its length, so Asr is later.
        </p>
      </section>
      <ToolFaq
        items={[
          { q: "Why are these times different from my mosque's timetable?", a: "Mosques may use a different calculation method or their own local timetable, and many add a few minutes for safety. Small differences of a few minutes are normal, so follow your local mosque for congregational prayers." },
          { q: "Is my location sent anywhere?", a: "No. Your location is used only in your browser to work out the times, and it never leaves your device. You can also choose a city or type coordinates instead of sharing your location." },
          { q: "Which Asr method should I use?", a: "Choose Hanafi if you follow the Hanafi school, common in South Asia and Turkey. Otherwise choose the standard method used by the Shafi'i, Maliki and Hanbali schools." },
          { q: "Why do Fajr and Isha look unusual in summer far north?", a: "At high latitudes, such as northern Europe in summer, the sun may not go far enough below the horizon for the usual Fajr and Isha angles. Local mosques often use special rules for these weeks, so check their timetable." },
        ]}
      />
    </ToolShell>
  );
}
