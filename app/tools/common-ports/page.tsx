import type { Metadata } from "next";
import SearchList from "@/components/tools/SearchList";
import ToolShell from "@/components/tools/ToolShell";
import { ports } from "@/lib/itTools";

export const metadata: Metadata = {
  title: { absolute: "Common Port Numbers Cheat Sheet for CompTIA A+, Network+ & Security+" },
  description: "Searchable list of the common TCP and UDP port numbers you need for CompTIA A+, Network+ and Security+: FTP, SSH, DNS, DHCP, HTTPS, RDP and more.",
  alternates: { canonical: "/tools/common-ports/" },
};

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
    </ToolShell>
  );
}
