import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import HijriConverter from "@/components/tools/HijriConverter";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = withOg({
  title: { absolute: "Hijri Date Converter: Today's Islamic Date & Gregorian" },
  description: "Free Hijri date converter. See today's Islamic date and convert any date between the Gregorian and Hijri (Umm al-Qura) calendars, in both directions.",
  alternates: { canonical: "/tools/hijri-date-converter/" },
}, "ilmai");

const FAQ = [
  { q: "What is the Hijri calendar?", a: "The Hijri or Islamic calendar is a lunar calendar of 12 months. Each month starts with the new moon and lasts 29 or 30 days, so a Hijri year is about 354 days, around 11 days shorter than a Gregorian year. Year 1 AH began with the Prophet's migration (Hijrah) from Makkah to Madinah." },
  { q: "Which calendar does this converter use?", a: "It uses the Umm al-Qura calendar, the calculated Hijri calendar used in Saudi Arabia. It's a good guide for everyday dates." },
  { q: "Why might my local date be different?", a: "Many communities begin months, especially Ramadan, Shawwal (Eid al-Fitr) and Dhu al-Hijjah, by sighting the new moon. Depending on where you live, the date can differ by a day or two from a calculated calendar, so follow your local mosque or Islamic authority." },
  { q: "What are the 12 Hijri months?", a: "Muharram, Safar, Rabi al-Awwal, Rabi al-Thani, Jumada al-Ula, Jumada al-Akhirah, Rajab, Sha'ban, Ramadan, Shawwal, Dhu al-Qadah and Dhu al-Hijjah." },
  { q: "Why do Ramadan and Eid move each year?", a: "Because the Hijri year is about 11 days shorter than the Gregorian year, Islamic dates arrive around 11 days earlier in the Gregorian calendar each year." },
];

export default function HijriDateConverter() {
  return (
    <ToolShell
      path="/tools/hijri-date-converter/"
      name="Hijri date converter"
      eyebrow="Faith · free tool"
      title="Hijri date converter"
      intro="See today's Hijri date, and convert any date between the Gregorian and Islamic calendars in both directions."
      apps={["ilmai"]}
    >
      <HijriConverter />
      <section className="mt-10 rounded-2xl bg-[#ecfdf5] p-6">
        <h2 className="font-display text-xl font-extrabold">More free Islamic tools</h2>
        <ul className="mt-3 space-y-1.5 text-[#3d3d52]">
          <li>• <a className="font-semibold text-[#0f766e] underline" href="/blog/2026-11-12-ramadan-2027-dates/">Ramadan 2027 and key Islamic dates</a> for the year ahead.</li>
          <li>• <a className="font-semibold text-[#0f766e] underline" href="/tools/prayer-times/">Prayer times</a> for your location today.</li>
          <li>• <a className="font-semibold text-[#0f766e] underline" href="/tools/qibla/">Qibla direction</a> from wherever you are.</li>
          <li>• <a className="font-semibold text-[#0f766e] underline" href="/ilmai/ayah/">Ayah of the day</a>, a short Quran verse to reflect on.</li>
        </ul>
      </section>
      <ToolFaq items={FAQ} />
    </ToolShell>
  );
}
