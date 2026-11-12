import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import BudgetCalc from "@/components/tools/BudgetCalc";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = withOg({
  title: { absolute: "50/30/20 Budget Calculator: Split Your Monthly Income" },
  description: "Free 50/30/20 budget calculator. Enter your take-home pay to see how much to spend on needs, wants and savings, and compare with what you spend now.",
  alternates: { canonical: "/tools/budget-calculator/" },
}, "budgetwise");

const FAQ = [
  { q: "What is the 50/30/20 rule?", a: "It's a simple way to budget your take-home pay: about 50% on needs such as rent, bills and food, 30% on wants such as eating out and hobbies, and 20% on savings and paying off debt beyond the minimum payments." },
  { q: "Should I use my income before or after tax?", a: "After tax. The rule works on take-home pay: what actually arrives in your account each month after tax and other deductions." },
  { q: "What if my needs cost more than 50%?", a: "That's common where rent is high. Try a 60/20/20 or 70/20/10 split instead, keep some money going to savings every month, and look for needs you can lower over time, such as switching energy or phone deals." },
  { q: "Do debt repayments count as needs or savings?", a: "Minimum payments count as needs, because you have to make them. Anything extra you pay to clear debt faster counts in the savings and debt part." },
  { q: "Is my information saved?", a: "No. The calculator works entirely in your browser and nothing you type is sent anywhere." },
];

export default function BudgetCalculator() {
  return (
    <ToolShell
      path="/tools/budget-calculator/"
      name="Budget calculator"
      eyebrow="Money · free tool"
      title="50/30/20 budget calculator"
      intro="Enter your monthly take-home pay to see how much to put towards needs, wants and savings. Then compare it with what you spend now."
      apps={["budgetwise", "renu"]}
    >
      <BudgetCalc />
      <section className="mt-10 rounded-2xl bg-[#ecfdf5] p-6">
        <h2 className="font-display text-xl font-extrabold">How to make the 50/30/20 rule work</h2>
        <ul className="mt-3 space-y-1.5 text-[#3d3d52]">
          <li>• New to this? Read <a className="font-semibold text-[#047857] underline" href="/blog/2026-11-12-50-30-20-rule-explained/">the 50/30/20 rule explained, with examples</a>.</li>
          <li>• Track one month of spending first, so you know your real numbers.</li>
          <li>• Move the savings amount on payday, before you start spending.</li>
          <li>• Build an emergency fund first, then add to longer-term savings.</li>
          <li>• Check your subscriptions with the free <a className="font-semibold text-[#047857] underline" href="/tools/subscription-calculator/">subscription calculator</a>. They often hide in the wants.</li>
          <li>• Clearing debt? The <a className="font-semibold text-[#047857] underline" href="/tools/debt-payoff-calculator/">debt payoff calculator</a> shows the fastest way.</li>
        </ul>
      </section>
      <ToolFaq items={FAQ} />
    </ToolShell>
  );
}
