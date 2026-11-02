"use client";

import { useMemo, useState } from "react";

// A searchable reference table. Rows are matched on every column.
export default function SearchList({ columns, rows, placeholder }: { columns: string[]; rows: string[][]; placeholder: string }) {
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? rows.filter((r) => r.some((c) => c.toLowerCase().includes(s))) : rows;
  }, [q, rows]);

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">{placeholder}</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="h-14 w-full rounded-2xl bg-white px-5 pl-12 text-base ring-1 ring-black/10 outline-none focus:ring-2 focus:ring-[#8b5cf6]"
        />
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6b6b80]">⌕</span>
      </label>
      <p className="mt-3 px-1 text-sm text-[#6b6b80]">
        Showing {shown.length} of {rows.length}
      </p>
      <div className="mt-3 overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-black/5">
        <table className="w-full text-left text-sm sm:text-base">
          <thead className="bg-[#0f0f1a] text-white">
            <tr>
              {columns.map((c) => (
                <th key={c} className="px-4 py-3 font-semibold">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((r, i) => (
              <tr key={r.join("|")} className={i % 2 ? "bg-[#faf8f4]" : ""}>
                {r.map((c, j) => (
                  <td key={j} className={`px-4 py-3 align-top ${j === 0 ? "whitespace-nowrap font-bold" : "text-[#3d3d52]"}`}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-[#6b6b80]">
                  Nothing matches “{q}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
