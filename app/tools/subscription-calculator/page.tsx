import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import SubscriptionCalc from "@/components/tools/SubscriptionCalc";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = withOg({
  title: { absolute: "Subscription Cost Calculator: How Much Do You Really Spend?" },
  description: "Add your subscriptions (streaming, music, cloud, gym) and see what they cost per month, per year and over 5 years. Free, private, no sign-up.",
  alternates: { canonical: "/tools/subscription-calculator/" },
}, "renu");

const FAQ = [
  { q: "How do I work out my total subscription cost?", a: "List every regular payment, including streaming, music, cloud storage, apps, gym, phone and news. Add each one with its price and how often you pay, and the calculator turns weekly, monthly and yearly payments into one monthly and yearly total." },
  { q: "How can I find subscriptions I've forgotten about?", a: "Look through your last two or three bank and card statements for repeat payments, check the subscriptions page in your Google Play or Apple account, and search your email for words like \"receipt\", \"renewal\" and \"trial\"." },
  { q: "Is yearly billing cheaper than monthly?", a: "Often, yes. Many services charge less per month if you pay for a year up front. It only saves money if you'll keep using the service for the whole year, so switch to yearly only for the ones you're sure about." },
  { q: "What's the easiest way to stop paying for unused subscriptions?", a: "Cancel anything you haven't used in the last month, and set a reminder a few days before free trials and renewals so you can decide in time. You can usually rejoin later if you miss it." },
  { q: "Is my information saved or shared?", a: "Your list stays in your own browser on this device, so it's still there next time you visit. Nothing is sent to us or anyone else." },
];

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

      <section className="mt-12">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">How much do subscriptions really cost?</h2>
        <div className="mt-4 space-y-4 text-lg leading-relaxed text-[#3d3d52]">
          <p>
            One subscription rarely feels expensive. The trouble is how they add up. Streaming, music, cloud storage, apps, a gym and a news site can easily come to more than you&apos;d guess, and most renew automatically, so the cost keeps going whether you use them or not.
          </p>
          <p>
            Seeing the yearly figure is often the eye-opener. A £9.99 monthly plan costs £119.88 a year, and five plans like it cost almost £600. Over five years, that&apos;s nearly £3,000.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-[#ecfdf5] p-6">
        <h2 className="font-display text-xl font-extrabold">Tips to cut subscription costs</h2>
        <ul className="mt-3 space-y-1.5 text-[#3d3d52]">
          <li>• Cancel anything you haven&apos;t used in the last month.</li>
          <li>• Rotate streaming services: keep one at a time and switch when you&apos;ve watched what you wanted.</li>
          <li>• Switch to yearly billing for services you&apos;ll definitely keep. It&apos;s often cheaper.</li>
          <li>• Share family plans where the terms allow it.</li>
          <li>• Set a reminder before free trials end and before yearly plans renew.</li>
        </ul>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
          <h2 className="font-display text-xl font-extrabold">Put the savings to work</h2>
          <p className="mt-2 text-[#3d3d52]">
            Plan your whole month with the <a className="font-semibold text-[#047857] underline" href="/tools/budget-calculator/">50/30/20 budget calculator</a>, then see how fast the money you free up grows with the{" "}
            <a className="font-semibold text-[#047857] underline" href="/tools/savings-goal-calculator/">savings goal calculator</a>.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
          <h2 className="font-display text-xl font-extrabold">Never miss a renewal</h2>
          <p className="mt-2 text-[#3d3d52]">
            The <a className="font-semibold text-[#047857] underline" href="/renu/">Renu app</a> keeps every subscription in one list and reminds you before each one renews, without linking your bank account.
          </p>
        </div>
      </section>

      <ToolFaq items={FAQ} />
    </ToolShell>
  );
}
