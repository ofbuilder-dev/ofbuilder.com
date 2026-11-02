import type { Metadata } from "next";
import SearchList from "@/components/tools/SearchList";
import ToolShell from "@/components/tools/ToolShell";
import { acronyms } from "@/lib/itTools";

export const metadata: Metadata = {
  title: { absolute: "Security+ Acronyms List (SY0-701): Searchable Cheat Sheet" },
  description: "Searchable list of common CompTIA Security+ acronyms with meanings: SIEM, SOAR, PKI, MFA, RTO, RPO, ALE and more. Free cheat sheet for exam revision.",
  alternates: { canonical: "/tools/security-plus-acronyms/" },
};

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
    </ToolShell>
  );
}
