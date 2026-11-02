import type { Metadata } from "next";
import SubnetCalc from "@/components/tools/SubnetCalc";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = {
  title: { absolute: "Subnet Calculator (IPv4): Network, Broadcast & Host Range" },
  description: "Free IPv4 subnet calculator: enter an IP address and CIDR prefix to get the network, broadcast, subnet mask, wildcard mask and usable host range.",
  alternates: { canonical: "/tools/subnet-calculator/" },
};

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
        <div className="mt-4 overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-black/5">
          <table className="w-full text-left">
            <thead className="bg-[#0f0f1a] text-white">
              <tr>
                <th className="px-4 py-3">Prefix</th>
                <th className="px-4 py-3">Mask</th>
                <th className="px-4 py-3">Usable hosts</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {SIZES.map(([p, m, h], i) => (
                <tr key={p} className={i % 2 ? "bg-[#faf8f4]" : ""}>
                  <td className="px-4 py-3 font-bold">{p}</td>
                  <td className="px-4 py-3">{m}</td>
                  <td className="px-4 py-3">{h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ToolShell>
  );
}
