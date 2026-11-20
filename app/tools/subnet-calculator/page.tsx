import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import SubnetCalc from "@/components/tools/SubnetCalc";
import ToolFaq from "@/components/tools/ToolFaq";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = withOg({
  title: { absolute: "Subnet Calculator (IPv4): Network, Broadcast & Host Range" },
  description: "Free IPv4 subnet calculator: enter an IP address and CIDR prefix to get the network, broadcast, subnet mask, wildcard mask and usable host range.",
  alternates: { canonical: "/tools/subnet-calculator/" },
}, "network-plus");

const SIZES: [string, string, string][] = [
  ["/24", "255.255.255.0", "254"],
  ["/25", "255.255.255.128", "126"],
  ["/26", "255.255.255.192", "62"],
  ["/27", "255.255.255.224", "30"],
  ["/28", "255.255.255.240", "14"],
  ["/29", "255.255.255.248", "6"],
  ["/30", "255.255.255.252", "2"],
];

export default function SubnetCalculator() {
  return (
    <ToolShell
      path="/tools/subnet-calculator/"
      name="Subnet calculator"
      eyebrow="Free tool"
      title="Subnet calculator"
      intro="Type an IPv4 address and pick a prefix. You'll see the network address, broadcast, subnet mask and usable host range straight away."
      apps={["network-plus", "a-plus-core-1"]}
    >
      <SubnetCalc />
      <section className="mt-10">
        <h2 className="font-display text-2xl font-extrabold">Quick reference</h2>
        <p className="mt-1 text-[#3d3d52]">Usable hosts = 2^(32 − prefix) − 2. Learn these common sizes for the exam.</p>
        <div className="mt-4 overflow-x-auto rounded-[1.5rem] bg-white ring-1 ring-black/5">
          <table className="w-full text-left text-sm sm:text-base">
            <thead className="bg-[#0f0f1a] text-white">
              <tr>
                <th className="px-3 py-3 sm:px-4">Prefix</th>
                <th className="px-3 py-3 sm:px-4">Mask</th>
                <th className="px-3 py-3 sm:px-4">Usable hosts</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {SIZES.map(([p, m, h], i) => (
                <tr key={p} className={i % 2 ? "bg-[#faf8f4]" : ""}>
                  <td className="px-3 py-3 font-bold sm:px-4">{p}</td>
                  <td className="px-3 py-3 sm:px-4">{m}</td>
                  <td className="px-3 py-3 sm:px-4">{h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-10 rounded-2xl bg-[#f3efff] p-6">
        <h2 className="font-display text-xl font-extrabold">Learning to subnet by hand?</h2>
        <p className="mt-2 text-[#3d3d52]">
          Work it out with the block-size method in{" "}
          <a className="font-semibold text-[#7c3aed] underline" href="/blog/2026-11-06-how-to-subnet-cidr/">how to subnet: CIDR, masks and usable hosts</a>, then check your answers here. The{" "}
          <a className="font-semibold text-[#7c3aed] underline" href="/tools/osi-model/">OSI model cheat sheet</a> and <a className="font-semibold text-[#7c3aed] underline" href="/tools/common-ports/">common ports list</a> cover the other Network+ basics.
        </p>
      </section>
      <ToolFaq
        items={[
          { q: "How many usable hosts are in a /24?", a: "254. A /24 has 256 addresses (mask 255.255.255.0). The first is the network address and the last is the broadcast address, so 254 can be given to devices." },
          { q: "Why do you subtract 2 from the number of hosts?", a: "In each subnet the first address identifies the network and the last is the broadcast address. Neither can be assigned to a device, so usable hosts = 2 to the power of the host bits, minus 2." },
          { q: "What is a /30 used for?", a: "A /30 has 4 addresses and 2 usable hosts, which is exactly enough for a point-to-point link between two routers." },
          { q: "What are the private IPv4 address ranges?", a: "10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. They're used inside home and company networks and aren't routed on the public internet." },
          { q: "What does a 169.254.x.x address mean?", a: "It's an APIPA (link-local) address. A device gives itself one when it can't get an address from a DHCP server, so it usually points to a DHCP or connection problem." },
        ]}
      />
    </ToolShell>
  );
}
