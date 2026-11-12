import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import SavingsCalc from "@/components/tools/SavingsCalc";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = withOg({
  title: { absolute: "Savings Goal Calculator: How Long to Save, or How Much?" },
  description: "Free savings goal calculator. See how long it takes to reach your goal, or how much to save each month to get there by a set date, with interest included.",
  alternates: { canonical: "/tools/savings-goal-calculator/" },
}, "budgetwise");

const FAQ = [
  { q: "How do I work out how much to save each month?", a: "Choose \"How much a month?\", enter your goal, what you've saved so far, how many months you have and the interest rate. The calculator works out the monthly amount, including the interest your savings earn." },
  { q: "How is interest worked out?", a: "Interest is added monthly at one twelfth of the yearly rate you enter, and each month's saving is added at the end of the month. Real accounts can work slightly differently, so treat the result as a guide." },
  { q: "What interest rate should I use?", a: "Use the rate on your savings account. If your money earns no interest, enter 0. Rates can change, so check again from time to time." },
  { q: "What should I save for first?", a: "Many people start with an emergency fund that covers a few months of essential costs, then save for bigger goals such as a holiday, a car or a house deposit." },
  { q: "Is my information saved?", a: "No. Everything is worked out in your browser and nothing is sent anywhere." },
];

export default function SavingsGoalCalculator() {
  return (
    <ToolShell
      path="/tools/savings-goal-calculator/"
      name="Savings goal calculator"
      eyebrow="Money · free tool"
      title="Savings goal calculator"
      intro="Saving for a holiday, a car or an emergency fund? See how long it will take, or how much to put away each month to get there on time."
      apps={["budgetwise", "renu"]}
    >
      <SavingsCalc />
      <section className="mt-10 rounded-2xl bg-[#ecfdf5] p-6">
        <h2 className="font-display text-xl font-extrabold">Tips to reach your goal sooner</h2>
        <ul className="mt-3 space-y-1.5 text-[#3d3d52]">
          <li>• Set up a standing order on payday so saving happens automatically.</li>
          <li>• Keep goal savings in a separate account so they're not spent by accident.</li>
          <li>• Free up money by cancelling unused subscriptions. Check with the <a className="font-semibold text-[#047857] underline" href="/tools/subscription-calculator/">subscription calculator</a>.</li>
          <li>• Plan your whole month with the <a className="font-semibold text-[#047857] underline" href="/tools/budget-calculator/">50/30/20 budget calculator</a>.</li>
        </ul>
      </section>
      <ToolFaq items={FAQ} />
    </ToolShell>
  );
}
