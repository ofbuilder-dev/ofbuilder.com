import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import SearchList from "@/components/tools/SearchList";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";
import { acronyms } from "@/lib/itTools";

export const metadata: Metadata = withOg({
  title: { absolute: "Security+ Acronyms List (SY0-701): Searchable Cheat Sheet" },
  description: "Searchable list of common CompTIA Security+ acronyms with meanings: SIEM, SOAR, PKI, MFA, RTO, RPO, ALE and more. Free cheat sheet for exam revision.",
  alternates: { canonical: "/tools/security-plus-acronyms/" },
}, "security-plus");

export default function SecurityAcronyms() {
  return (
    <ToolShell
      path="/tools/security-plus-acronyms/"
      name="Security+ acronyms"
      eyebrow="Cheat sheet"
      title="Security+ acronyms"
      intro={`${acronyms.length} common acronyms you'll meet in Security+ and other security exams. Search by the acronym or by what it stands for.`}
      apps={["security-plus", "cysa-plus"]}
    >
      <SearchList columns={["Acronym", "Stands for", "Note"]} rows={acronyms.map((a) => [a.short, a.long, a.note ?? ""])} placeholder="Search acronyms, e.g. SIEM or recovery" />
      <p className="mt-6 text-sm text-[#6b6b80]">CompTIA publishes the full official acronym list with each exam's objectives. Use it alongside this cheat sheet.</p>
      <section className="mt-10 rounded-2xl bg-[#f3efff] p-6">
        <h2 className="font-display text-xl font-extrabold">How to learn the acronyms</h2>
        <p className="mt-2 text-[#3d3d52]">
          Learn them in groups by topic rather than alphabetically, and say what each one does, not just what the letters stand for. Pairs that are easy to mix up, such as RTO and RPO or SIEM and SOAR, are worth extra practice. See how they fit together in{" "}
          <a className="font-semibold text-[#7c3aed] underline" href="/blog/2026-11-06-security-plus-sy0-701-domains/">the Security+ SY0-701 domains explained</a>, and check the{" "}
          <a className="font-semibold text-[#7c3aed] underline" href="/tools/comptia-passing-scores/">CompTIA passing scores</a> before you book.
        </p>
      </section>
      <ToolFaq
        items={[
          { q: "What is the difference between SIEM and SOAR?", a: "A SIEM (Security Information and Event Management) system collects and analyses logs and alerts from across a network. SOAR (Security Orchestration, Automation and Response) goes a step further and automates the response, for example by running a playbook when a certain alert fires." },
          { q: "What is the difference between RTO and RPO?", a: "RTO (Recovery Time Objective) is how long a system can be down before it must be restored. RPO (Recovery Point Objective) is how much data, measured in time, you can afford to lose. An RPO of 4 hours means backups must be no more than 4 hours old." },
          { q: "What does MFA mean?", a: "Multi-Factor Authentication: proving who you are with two or more different types of factor, such as something you know (a password), something you have (a phone or security key) and something you are (a fingerprint)." },
          { q: "What is PKI?", a: "Public Key Infrastructure: the system of certificate authorities, digital certificates and public and private keys that lets people and devices trust each other's identities, for example when you connect to an HTTPS website." },
          { q: "Do I need to know every acronym for Security+?", a: "CompTIA publishes a long acronym list with the exam objectives, and any of them can appear. Focus first on the ones linked to the biggest domains, such as security operations and threats, then work through the rest." },
        ]}
      />
    </ToolShell>
  );
}
