import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import SearchList from "@/components/tools/SearchList";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = withOg({
  title: { absolute: "OSI Model Cheat Sheet: 7 Layers, Protocols & Devices" },
  description: "Searchable OSI model cheat sheet for CompTIA Network+ and Security+: all 7 layers with their job, data unit, example protocols and devices, plus a mnemonic.",
  alternates: { canonical: "/tools/osi-model/" },
}, "network-plus");

const LAYERS = [
  ["7", "Application", "Network services for applications and users", "Data", "HTTP, HTTPS, DNS, SMTP, FTP, SSH, SNMP, DHCP", "—"],
  ["6", "Presentation", "Formats, encrypts and compresses data", "Data", "Character encoding (ASCII, Unicode), JPEG, encryption", "—"],
  ["5", "Session", "Opens, manages and closes sessions between hosts", "Data", "NetBIOS, RPC, session set-up", "—"],
  ["4", "Transport", "End-to-end delivery, ports, reliability", "Segment (TCP) / datagram (UDP)", "TCP, UDP", "Firewalls that filter by port"],
  ["3", "Network", "Logical addressing and routing between networks", "Packet", "IPv4, IPv6, ICMP, IPsec", "Router, Layer 3 switch"],
  ["2", "Data Link", "Physical (MAC) addressing and frames on the local network", "Frame", "Ethernet, Wi-Fi (802.11), MAC addresses, VLANs (802.1Q)", "Switch, bridge, wireless access point"],
  ["1", "Physical", "Sends raw bits over cables or radio", "Bit", "Cabling, connectors, radio signals", "Hub, repeater, media converter, cable"],
];

const FAQ = [
  { q: "What are the 7 layers of the OSI model?", a: "From the top: 7 Application, 6 Presentation, 5 Session, 4 Transport, 3 Network, 2 Data Link and 1 Physical." },
  { q: "What's an easy way to remember the OSI layers?", a: "From layer 1 up: \"Please Do Not Throw Sausage Pizza Away\" (Physical, Data Link, Network, Transport, Session, Presentation, Application). From layer 7 down: \"All People Seem To Need Data Processing\"." },
  { q: "Which layer does a switch work at?", a: "A standard switch works at layer 2, the Data Link layer, using MAC addresses. A Layer 3 switch can also route between networks using IP addresses." },
  { q: "Which layer does a router work at?", a: "Layer 3, the Network layer. Routers forward packets between networks using IP addresses." },
  { q: "How does the OSI model compare with the TCP/IP model?", a: "The TCP/IP model has four layers. Its Application layer covers OSI layers 5 to 7, Transport matches layer 4, Internet matches layer 3, and Network Access (or Link) covers layers 1 and 2." },
];

export default function OsiModel() {
  return (
    <ToolShell
      path="/tools/osi-model/"
      name="OSI model"
      eyebrow="Cheat sheet"
      title="OSI model cheat sheet"
      intro="All seven OSI layers in one table: what each layer does, its data unit, example protocols and the devices that work there. Search any term."
      apps={["network-plus", "security-plus", "a-plus-core-1"]}
    >
      <SearchList columns={["Layer", "Name", "What it does", "Data unit", "Examples", "Devices"]} rows={LAYERS} placeholder="Search, e.g. router, TCP or frame" />
      <div className="mt-8 rounded-2xl bg-[#f3efff] p-6">
        <h2 className="font-display text-xl font-extrabold">Memory tip</h2>
        <p className="mt-2 text-[#3d3d52]">
          Layers 1 to 7: <strong>P</strong>lease <strong>D</strong>o <strong>N</strong>ot <strong>T</strong>hrow <strong>S</strong>ausage <strong>P</strong>izza <strong>A</strong>way. Then tie each layer to one device you know: hub at 1, switch at 2, router at 3.
        </p>
        <p className="mt-3 text-[#3d3d52]">
          Exam questions often describe a problem and ask which layer it sits at. A broken cable is layer 1, a wrong VLAN is layer 2, a bad IP address or route is layer 3, and a blocked port is layer 4. Learn the ports too with the <a className="font-semibold text-[#7c3aed] underline" href="/tools/common-ports/">common ports list</a>.
        </p>
      </div>
      <ToolFaq items={FAQ} />
    </ToolShell>
  );
}
