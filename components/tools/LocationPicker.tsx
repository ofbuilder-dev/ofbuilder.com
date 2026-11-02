"use client";

import { useState } from "react";
import type { Loc } from "./useLocation";

const CITIES: Loc[] = [
  { label: "London", lat: 51.5074, lng: -0.1278 },
  { label: "New York", lat: 40.7128, lng: -74.006 },
  { label: "Toronto", lat: 43.6532, lng: -79.3832 },
  { label: "Sydney", lat: -33.8688, lng: 151.2093 },
  { label: "Berlin", lat: 52.52, lng: 13.405 },
  { label: "Dhaka", lat: 23.8103, lng: 90.4125 },
  { label: "Karachi", lat: 24.8607, lng: 67.0011 },
  { label: "Jakarta", lat: -6.2088, lng: 106.8456 },
  { label: "Dubai", lat: 25.2048, lng: 55.2708 },
  { label: "Cairo", lat: 30.0444, lng: 31.2357 },
  { label: "Istanbul", lat: 41.0082, lng: 28.9784 },
  { label: "Kuala Lumpur", lat: 3.139, lng: 101.6869 },
];

export default function LocationPicker({ loc, status, locate, save }: { loc: Loc | null; status: string; locate: () => void; save: (l: Loc) => void }) {
  const [open, setOpen] = useState(false);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const field = "h-11 w-full rounded-xl bg-[#faf8f4] px-3 font-mono ring-1 ring-black/10 outline-none focus:ring-2 focus:ring-[#0f766e]";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={locate} className="inline-flex h-12 items-center rounded-full bg-[#0f766e] px-6 font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5">
          📍 {status === "asking" ? "Finding you…" : "Use my location"}
        </button>
        <select
          value=""
          onChange={(e) => {
            const c = CITIES.find((x) => x.label === e.target.value);
            if (c) save(c);
          }}
          className="h-12 rounded-full bg-white px-5 font-semibold ring-1 ring-black/10"
        >
          <option value="">Or choose a city…</option>
          {CITIES.map((c) => (
            <option key={c.label}>{c.label}</option>
          ))}
        </select>
        <button onClick={() => setOpen((o) => !o)} className="text-sm font-semibold text-[#0f766e] underline">
          Enter coordinates
        </button>
      </div>
      {status === "denied" && <p className="mt-3 text-sm font-semibold text-rose-600">We couldn't get your location. Choose a city or enter coordinates instead.</p>}
      {open && (
        <div className="mt-4 grid max-w-md grid-cols-[1fr_1fr_auto] gap-2">
          <input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" inputMode="decimal" className={field} />
          <input value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Longitude" inputMode="decimal" className={field} />
          <button
            onClick={() => {
              const a = parseFloat(lat);
              const b = parseFloat(lng);
              if (Math.abs(a) <= 90 && Math.abs(b) <= 180) save({ lat: a, lng: b, label: `${a.toFixed(2)}, ${b.toFixed(2)}` });
            }}
            className="rounded-xl bg-[#0f0f1a] px-4 font-bold text-white"
          >
            Set
          </button>
        </div>
      )}
      {loc && (
        <p className="mt-3 text-sm text-[#6b6b80]">
          Showing results for <b className="text-[#0f0f1a]">{loc.label}</b> ({loc.lat.toFixed(2)}, {loc.lng.toFixed(2)}). Saved on this device only.
        </p>
      )}
    </div>
  );
}
