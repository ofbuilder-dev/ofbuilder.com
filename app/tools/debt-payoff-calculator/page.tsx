import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import DebtCalc from "@/components/tools/DebtCalc";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = withOg({
  title: { absolute: "Debt Payoff Calculator: Avalanche vs Snowball Method" },
  description: "Free debt payoff calculator. Add your debts and see when you'll be debt-free and how much interest you'll pay with the avalanche and snowball methods.",
  alternates: { canonical: "/tools/debt-payoff-calculator/" },
}, "budgetwise");

const FAQ = [
  { q: "What is the debt avalanche method?", a: "You pay the minimum on every debt, then put any extra money towards the debt with the highest interest rate. When it's cleared, that payment moves to the next highest rate. It usually costs the least interest overall." },
  { q: "What is the debt snowball method?", a: "You pay the minimum on every debt, then put any extra money towards the smallest balance first. Clearing small debts quickly gives early wins, which helps many people stay motivated, though it can cost a little more interest." },
  { q: "Which method is better?", a: "Avalanche saves the most money when interest rates differ a lot. Snowball can work better if quick wins keep you going. The calculator shows both side by side so you can see the real difference for your debts." },
  { q: "What does APR mean?", a: "APR is the annual percentage rate: the yearly cost of borrowing. You can find it on your statement or in your account. The calculator adds interest monthly using one twelfth of the APR." },
  { q: "Why does it say my payments don't cover the interest?", a: "If the monthly interest on a debt is more than you pay, the balance keeps growing. Increase the extra payment, or speak to your lender or a free debt advice service." },
];

export default function DebtPayoffCalculator() {
  return (
    <ToolShell
      path="/tools/debt-payoff-calculator/"
      name="Debt payoff calculator"
      eyebrow="Money · free tool"
      title="Debt payoff calculator"
      intro="Add your debts and what you can pay each month. See when you'll be debt-free, and whether the avalanche or snowball method saves you more."
      apps={["budgetwise", "renu"]}
    >
      <DebtCalc />
      <section className="mt-10 rounded-2xl bg-[#ecfdf5] p-6">
        <h2 className="font-display text-xl font-extrabold">Ways to clear debt faster</h2>
        <ul className="mt-3 space-y-1.5 text-[#3d3d52]">
          <li>• Not sure which method to pick? Read <a className="font-semibold text-[#047857] underline" href="/blog/2026-11-12-debt-avalanche-vs-snowball/">debt avalanche vs snowball, with a worked example</a>.</li>
          <li>• Always pay at least the minimum on every debt to avoid fees.</li>
          <li>• Put any windfall, such as a bonus or tax refund, towards your target debt.</li>
          <li>• Ask your lender about a lower rate, or look at a balance transfer if you qualify.</li>
          <li>• Find spare money for extra payments with the <a className="font-semibold text-[#047857] underline" href="/tools/budget-calculator/">50/30/20 budget calculator</a>.</li>
        </ul>
      </section>
      <ToolFaq items={FAQ} />
    </ToolShell>
  );
}
