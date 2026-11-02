"use client";

import { useState } from "react";
import { subnet } from "@/lib/itTools";

// IPv4 subnet calculator: address + prefix length → network, broadcast, host range and masks.
export default function SubnetCalc() {
  const [ip, setIp] = useState("192.168.1.10");
  const [prefix, setPrefix] = useState(24);
  const r = subnet(ip, prefix);

  const rows: [string, string][] = r
    ? [
        ["Network", r.cidr],
        ["Subnet mask", r.mask],
        ["Wildcard mask", r.wildcard],
        ["First usable host", r.first],
        ["Last usable host", r.last],
        ["Broadcast", r.broadcast],
        ["Total addresses", r.total.toLocaleString("en-GB")],
        ["Usable hosts", r.usable.toLocaleString("en-GB")],
      ]
    : [];

  return (
    <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-10">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <label className="text-sm font-semibold text-[#3d3d52]">
          IP address
          <input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            inputMode="decimal"
            className="mt-1.5 block h-14 w-full rounded-2xl bg-[#faf8f4] px-5 font-mono text-lg ring-1 ring-black/10 outline-none focus:ring-2 focus:ring-[#8b5cf6]"
          />
        </label>
        <label className="text-sm font-semibold text-[#3d3d52]">
          Prefix (CIDR)
          <select
            value={prefix}
            onChange={(e) => setPrefix(Number(e.target.value))}
            className="mt-1.5 block h-14 w-full rounded-2xl bg-[#faf8f4] px-5 font-mono text-lg ring-1 ring-black/10 outline-none focus:ring-2 focus:ring-[#8b5cf6] sm:w-40"
          >
            {Array.from({ length: 33 }, (_, i) => (
              <option key={i} value={i}>
                /{i}
              </option>
            ))}
          </select>
        </label>
      </div>

      {r ? (
        <dl className="mt-8 grid gap-3 sm:grid-cols-2">
          {rows.map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-[#f3efff] p-4">
              <dt className="text-xs font-bold uppercase tracking-wider text-[#6b6b80]">{k}</dt>
              <dd className="mt-1 break-all font-mono text-lg font-bold">{v}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-8 rounded-2xl bg-rose-50 p-4 font-semibold text-rose-700">Enter a valid IPv4 address, like 10.0.0.25.</p>
      )}
      {r && prefix >= 31 && (
        <p className="mt-4 text-sm text-[#6b6b80]">/31 and /32 are special cases: /31 is used for point-to-point links (both addresses usable) and /32 is a single host.</p>
      )}
    </div>
  );
}
