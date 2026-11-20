import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import SearchList from "@/components/tools/SearchList";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";
import { ports } from "@/lib/itTools";

export const metadata: Metadata = withOg({
  title: { absolute: "Common Port Numbers Cheat Sheet (CompTIA A+, Network+)" },
  description: "Searchable list of the common TCP and UDP port numbers you need for CompTIA A+, Network+ and Security+: FTP, SSH, DNS, DHCP, HTTPS, RDP and more.",
  alternates: { canonical: "/tools/common-ports/" },
}, "network-plus");

export default function CommonPorts() {
  return (
    <ToolShell
      path="/tools/common-ports/"
      name="Common ports"
      eyebrow="Cheat sheet"
      title="Common port numbers"
      intro="The well-known TCP and UDP ports that come up in CompTIA A+, Network+ and Security+. Search by number, protocol or what it's used for."
      apps={["network-plus", "a-plus-core-1", "security-plus"]}
    >
      <SearchList columns={["Port", "Protocol", "TCP/UDP", "Used for"]} rows={ports.map((p) => [p.port, p.protocol, p.transport, p.use])} placeholder="Search ports, e.g. 443 or DNS" />
      <div className="mt-8 rounded-2xl bg-[#f3efff] p-6">
        <h2 className="font-display text-xl font-extrabold">Memory tip</h2>
        <p className="mt-2 text-[#3d3d52]">Many secure versions sit on their own port: HTTP 80 → HTTPS 443, LDAP 389 → LDAPS 636, IMAP 143 → IMAPS 993, POP3 110 → POP3S 995. Learn them in pairs.</p>
      </div>
      <p className="mt-6 text-[#3d3d52]">
        Want the ports grouped by topic, with tips for remembering them? Read{" "}
        <a className="font-semibold text-[#7c3aed] underline" href="/blog/2026-11-06-common-ports-comptia-cheat-sheet/">common port numbers for CompTIA A+, Network+ and Security+</a>.
      </p>
      <ToolFaq
        items={[
          { q: "What is port 443 used for?", a: "HTTPS: encrypted web traffic, which is HTTP over TLS. It runs over TCP. Plain, unencrypted HTTP uses port 80." },
          { q: "What is the difference between TCP and UDP?", a: "TCP sets up a connection and makes sure data arrives complete and in order, so it's used for web pages, email and file transfer. UDP sends data without that checking, which is faster, so it's used for things like DNS lookups, streaming and voice calls." },
          { q: "Which port does SSH use?", a: "Port 22, over TCP. SFTP and SCP run over SSH, so they use port 22 too. Telnet uses port 23 but sends everything unencrypted, so SSH should be used instead." },
          { q: "Which port does Remote Desktop use?", a: "Microsoft's Remote Desktop Protocol (RDP) uses TCP port 3389." },
          { q: "Does DNS use TCP or UDP?", a: "Both, on port 53. Most lookups use UDP. TCP is used for zone transfers and for replies that are too large for UDP." },
          { q: "Which ports should I learn for the CompTIA exams?", a: "Start with 20/21 FTP, 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 67/68 DHCP, 80 HTTP, 110 POP3, 143 IMAP, 443 HTTPS, 445 SMB and 3389 RDP, then add the secure versions such as 636 LDAPS, 993 IMAPS and 995 POP3S." },
        ]}
      />
    </ToolShell>
  );
}
