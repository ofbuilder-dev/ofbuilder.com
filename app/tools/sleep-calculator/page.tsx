import type { Metadata } from "next";
import SleepCalc from "@/components/tools/SleepCalc";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = {
  title: { absolute: "Sleep Calculator: What Time Should I Go to Bed?" },
  description: "Free sleep calculator: find the best time to go to bed or wake up, based on 90-minute sleep cycles, so you wake up feeling refreshed.",
  alternates: { canonical: "/tools/sleep-calculator/" },
};

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
      <p className="mt-6 text-sm text-[#6b6b80]">This tool gives general guidance only. If you have ongoing sleep problems, talk to a doctor.</p>
    </ToolShell>
  );
}
