import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import PasswordChecker from "@/components/tools/PasswordChecker";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = withOg({
  title: { absolute: "Password Strength Checker: How Secure Is My Password?" },
  description: "Check how strong your password is and how long it could take to crack. Runs entirely on your device: nothing is sent or saved. Plus a passphrase generator.",
  alternates: { canonical: "/tools/password-strength-checker/" },
}, "security-plus");

// Same model as the checker: half the search space at 10 billion guesses a second.
const CRACK = [
  ["8 lowercase letters", "abcdefgh", "about 10 seconds"],
  ["8 characters, all types", "aB3$eF6&", "about 4 days"],
  ["12 lowercase letters", "abcdefghijkl", "about 55 days"],
  ["12 characters, all types", "aB3$eF6&hJ9!", "about 860,000 years"],
  ["4 random words", "word-word-word-word", "about 2 days"],
  ["5 random words + a number", "Word-word-word-word-word-42", "about 4,000 years"],
  ["6 random words", "6 words from a 7,776-word list", "about 350,000 years"],
];

const FAQ = [
  { q: "Is it safe to type my password into this checker?", a: "Yes. The check runs entirely in your browser using JavaScript on your own device. Your password is never sent to a server, saved or logged. If you prefer, test a password that's similar to yours instead of the real one." },
  { q: "How long should a password be?", a: "At least 12 characters, and longer is better. Length adds strength much faster than swapping letters for symbols. For important accounts, a passphrase of 5 or more random words is a good choice." },
  { q: "Are passphrases better than complex passwords?", a: "Often, yes. A passphrase of random words is long, which makes it strong, and it's easier to remember and type than a short jumble of symbols. The words must be chosen at random, not taken from a song, quote or your own life." },
  { q: "How is the time to crack worked out?", a: "The checker estimates how many guesses an attacker would need from the length and the types of characters used, then assumes a fast offline attack of 10 billion guesses a second. It also lowers the score for common passwords, repeated characters and sequences like 1234. Treat the result as a rough guide, not a guarantee." },
  { q: "Do I still need multi-factor authentication?", a: "Yes. A strong password helps, but passwords can still leak through phishing or a company data breach. Multi-factor authentication (MFA), such as an authenticator app or a security key, protects your account even if the password is stolen." },
  { q: "Should I use a password manager?", a: "A password manager makes it easy to use a different, strong password for every account, which is one of the best things you can do. You then only need to remember one strong passphrase for the manager itself." },
];

export default function PasswordStrength() {
  return (
    <ToolShell
      path="/tools/password-strength-checker/"
      name="Password strength checker"
      eyebrow="Security · free tool"
      title="Password strength checker"
      intro="See how strong a password is, roughly how long it could take to crack, and how to make it stronger. It runs entirely in your browser."
      apps={["security-plus"]}
    >
      <PasswordChecker />

      <section className="mt-12">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">What makes a password strong?</h2>
        <div className="mt-4 space-y-4 text-lg leading-relaxed text-[#3d3d52]">
          <p>
            A strong password is one an attacker can&apos;t guess, even with a fast computer and a list of passwords leaked in past data breaches. Three things matter most: <strong className="text-[#0f0f1a]">length</strong>, <strong className="text-[#0f0f1a]">randomness</strong> and <strong className="text-[#0f0f1a]">using it in only one place</strong>.
          </p>
          <ul className="space-y-2">
            <li>• <strong className="text-[#0f0f1a]">Make it long.</strong> Every extra character multiplies the number of guesses needed. Aim for 12 characters or more.</li>
            <li>• <strong className="text-[#0f0f1a]">Make it random.</strong> Names, birthdays, pets, football teams and keyboard patterns like “qwerty” are among the first things attackers try.</li>
            <li>• <strong className="text-[#0f0f1a]">Never reuse it.</strong> If one site leaks your password, attackers try it on your email, bank and social media next.</li>
            <li>• <strong className="text-[#0f0f1a]">Don&apos;t rely on swaps.</strong> Changing “password” to “P@ssw0rd” barely helps, because cracking tools try those substitutions automatically.</li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">How long would it take to crack?</h2>
        <p className="mt-3 text-[#3d3d52]">Rough times for a random password in a fast offline attack (10 billion guesses a second). A password that appears in a leak list can fall almost instantly, whatever its length.</p>
        <div className="mt-5 overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-black/5">
          <table className="w-full text-left text-sm sm:text-base">
            <caption className="sr-only">Estimated time to crack by password type</caption>
            <thead className="bg-[#0f0f1a] text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Password</th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell">Looks like</th>
                <th className="px-4 py-3 font-semibold">Time to crack</th>
              </tr>
            </thead>
            <tbody>
              {CRACK.map(([t, ex, time], i) => (
                <tr key={t} className={i % 2 ? "bg-[#faf8f4]" : ""}>
                  <td className="px-4 py-3 font-semibold">{t}</td>
                  <td className="hidden px-4 py-3 font-mono text-sm text-[#55556a] sm:table-cell">{ex}</td>
                  <td className="px-4 py-3 text-[#3d3d52]">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-[#6b6b80]">Word counts assume words picked at random from the 7,776-word EFF list, as the passphrase generator above does.</p>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-[#f3efff] p-6">
          <h2 className="font-display text-xl font-extrabold">Use a password manager</h2>
          <p className="mt-2 text-[#3d3d52]">It creates and remembers a different strong password for every account. You only need to remember one strong passphrase for the manager.</p>
        </div>
        <div className="rounded-2xl bg-[#f3efff] p-6">
          <h2 className="font-display text-xl font-extrabold">Turn on MFA</h2>
          <p className="mt-2 text-[#3d3d52]">Multi-factor authentication (MFA) protects you even if a password leaks. Use an authenticator app or a security key where you can.</p>
        </div>
      </section>

      <section className="mt-12 rounded-2xl bg-white p-6 ring-1 ring-black/5">
        <h2 className="font-display text-xl font-extrabold">Studying for CompTIA Security+?</h2>
        <p className="mt-2 text-[#3d3d52]">
          Password policies, MFA, hashing and password attacks such as brute force, dictionary and credential stuffing all appear on the exam. Revise the terms with the{" "}
          <a className="font-semibold text-[#7c3aed] underline" href="/tools/security-plus-acronyms/">Security+ acronyms list</a>, see{" "}
          <a className="font-semibold text-[#7c3aed] underline" href="/blog/2026-11-06-security-plus-sy0-701-domains/">the SY0-701 domains explained</a>, or check the{" "}
          <a className="font-semibold text-[#7c3aed] underline" href="/tools/comptia-passing-scores/">CompTIA passing scores</a>.
        </p>
      </section>

      <ToolFaq items={FAQ} />
      <p className="mt-6 text-sm text-[#6b6b80]">
        Crack times are rough estimates. The passphrase generator uses the{" "}
        <a className="underline" href="https://www.eff.org/dice" target="_blank" rel="noopener noreferrer">EFF long word list</a> (CC BY 3.0 US).
      </p>
    </ToolShell>
  );
}
