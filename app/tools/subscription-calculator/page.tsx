import type { Metadata } from "next";
import SubscriptionCalc from "@/components/tools/SubscriptionCalc";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = {
  title: { absolute: "Subscription Cost Calculator: How Much Do You Really Spend?" },
  description: "Add your subscriptions (streaming, music, cloud, gym) and see what they cost per month, per year and over 5 years. Free, private, no sign-up.",
  alternates: { canonical: "/tools/subscription-calculator/" },
};

export default function SubscriptionCalculator() {
  return (
    <ToolShell
      path="/tools/subscription-calculator/"
      name="Subscription calculator"
      eyebrow="Money · free tool"
      title="Subscription cost calculator"
      intro="Small monthly payments add up fast. Add what you pay for and see the real cost per month, per year and over five years."
      apps={["renu", "budgetwise"]}
    >
      <SubscriptionCalc />
      <section className="mt-10 rounded-2xl bg-[#ecfdf5] p-6">
        <h2 className="font-display text-xl font-extrabold">Tips to cut subscription costs</h2>
        <ul className="mt-3 space-y-1.5 text-[#3d3d52]">
          <li>• Cancel anything you haven't used in the last month.</li>
          <li>• Switch to yearly billing for services you'll definitely keep. It's often cheaper.</li>
          <li>• Share family plans where the terms allow it.</li>
          <li>• Set a reminder before free trials end.</li>
        </ul>
      </section>
    </ToolShell>
  );
}
