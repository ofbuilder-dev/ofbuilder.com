import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import SleepCalc from "@/components/tools/SleepCalc";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = withOg({
  title: { absolute: "Sleep Calculator: What Time Should I Go to Bed?" },
  description: "Free sleep calculator: find the best time to go to bed or wake up, based on 90-minute sleep cycles, so you wake up feeling refreshed.",
  alternates: { canonical: "/tools/sleep-calculator/" },
}, "sleepwise");

export default function SleepCalculator() {
  return (
    <ToolShell
      path="/tools/sleep-calculator/"
      name="Sleep calculator"
      eyebrow="Free tool"
      title="Sleep calculator"
      intro="Waking up in the middle of a sleep cycle leaves you groggy. Pick your wake-up time and we'll show you the best times to fall asleep."
      apps={["sleepwise"]}
    >
      <SleepCalc />
      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-[#f3efff] p-6">
          <h2 className="font-display text-xl font-extrabold">What is a sleep cycle?</h2>
          <p className="mt-2 text-[#3d3d52]">Through the night you move through light sleep, deep sleep and REM sleep in cycles of roughly 90 minutes. Waking at the end of a cycle usually feels easier.</p>
        </div>
        <div className="rounded-2xl bg-[#f3efff] p-6">
          <h2 className="font-display text-xl font-extrabold">How much sleep do I need?</h2>
          <p className="mt-2 text-[#3d3d52]">Most adults need 7 to 9 hours a night. If you often feel tired, keep a regular bedtime and wake-up time, even at weekends.</p>
        </div>
      </section>
      <p className="mt-6 text-[#3d3d52]">
        Want the full picture? Read{" "}
        <a className="font-semibold text-[#7c3aed] underline" href="/blog/2026-11-17-what-time-should-i-go-to-bed/">what time should I go to bed? Sleep cycles explained</a>.
      </p>
      <p className="mt-6 text-sm text-[#6b6b80]">This tool gives general guidance only. If you have ongoing sleep problems, talk to a doctor.</p>
      <ToolFaq
        items={[
          { q: "How many hours of sleep do I need?", a: "Most adults need about 7 to 9 hours a night. Teenagers usually need more, around 8 to 10 hours. If you often feel tired during the day, you may need more than you're getting." },
          { q: "How long does it take to fall asleep?", a: "Many people fall asleep within about 10 to 20 minutes of turning out the light. The calculator allows 15 minutes. If you usually take longer, go to bed a little earlier than it suggests." },
          { q: "Why do I feel groggy after a long sleep?", a: "Waking up from deep sleep can leave you feeling heavy and slow for a while, even after plenty of hours in bed. Timing your alarm for the end of a sleep cycle, when sleep is lighter, can help." },
          { q: "Is 6 hours of sleep enough?", a: "Six hours (four cycles) is fine for the odd night, but most adults need more than that on a regular basis. Aim for five or six cycles, 7.5 to 9 hours, most nights." },
          { q: "Does the 90-minute cycle work for everyone?", a: "It's an average. Sleep cycles vary from person to person and change through the night, so treat the times as a starting point and adjust by 15 minutes or so until you wake feeling rested." },
        ]}
      />
    </ToolShell>
  );
}
