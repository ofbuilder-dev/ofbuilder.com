"use client";

import { useEffect, useState } from "react";
import { qibla } from "@/lib/prayTimes";
import LocationPicker from "./LocationPicker";
import { useLocation } from "./useLocation";

type OrientationEventIOS = DeviceOrientationEvent & { webkitCompassHeading?: number };

// Qibla direction from the visitor's location, with a live compass on phones that support it.
export default function QiblaFinder() {
  const l = useLocation();
  const [heading, setHeading] = useState<number | null>(null);
  const [compass, setCompass] = useState<"off" | "on" | "unsupported">("off");
  const bearing = l.loc ? qibla(l.loc.lat, l.loc.lng) : null;

  useEffect(() => {
    if (compass !== "on") return;
    const onTurn = (e: Event) => {
      const ev = e as OrientationEventIOS;
      const h = ev.webkitCompassHeading ?? (ev.absolute && ev.alpha != null ? 360 - ev.alpha : null);
      if (h != null) setHeading(h);
    };
    window.addEventListener("deviceorientationabsolute", onTurn);
    window.addEventListener("deviceorientation", onTurn);
    return () => {
      window.removeEventListener("deviceorientationabsolute", onTurn);
      window.removeEventListener("deviceorientation", onTurn);
    };
  }, [compass]);

  const startCompass = async () => {
    const DOE = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> } | undefined;
    if (!DOE) return setCompass("unsupported");
    try {
      if (DOE.requestPermission && (await DOE.requestPermission()) !== "granted") return setCompass("unsupported");
      setCompass("on");
    } catch {
      setCompass("unsupported");
    }
  };

  // With a live compass the arrow points to the Qibla relative to where the phone faces; otherwise from north.
  const arrow = bearing == null ? 0 : heading == null ? bearing : bearing - heading;

  return (
    <div className="rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-10">
      <LocationPicker {...l} />
      {bearing != null && (
        <div className="mt-8 flex flex-col items-center text-center">
          <div className="relative grid h-64 w-64 place-items-center rounded-full bg-[#ecfaf6] ring-8 ring-[#0f766e]/10">
            {["N", "E", "S", "W"].map((d, i) => (
              <span
                key={d}
                className="absolute text-sm font-extrabold text-[#6b6b80]"
                style={{ transform: `rotate(${i * 90 - (heading ?? 0)}deg) translateY(-112px) rotate(${-(i * 90 - (heading ?? 0))}deg)` }}
              >
                {d}
              </span>
            ))}
            <div className="absolute h-44 w-2 transition-transform duration-300" style={{ transform: `rotate(${arrow}deg)` }}>
              <div className="mx-auto h-0 w-0 border-x-[14px] border-b-[26px] border-x-transparent border-b-[#0f766e]" style={{ marginLeft: -10 }} />
              <div className="mx-auto h-20 w-2 rounded-full bg-[#0f766e]" />
            </div>
            <span className="absolute text-3xl">🕋</span>
          </div>
          <p className="font-display mt-6 text-5xl font-extrabold text-[#0f766e]">{bearing.toFixed(1)}°</p>
          <p className="mt-1 text-[#3d3d52]">Qibla direction, clockwise from true north</p>
          {compass === "off" && (
            <button onClick={startCompass} className="mt-6 h-12 rounded-full bg-[#0f0f1a] px-6 font-bold text-white">
              🧭 Use my phone's compass
            </button>
          )}
          {compass === "on" && heading == null && <p className="mt-4 text-sm text-[#6b6b80]">Hold your phone flat and move it in a figure of eight to calibrate.</p>}
          {compass === "on" && heading != null && <p className="mt-4 font-semibold text-[#0f766e]">Turn until the arrow points straight up. You're then facing the Qibla.</p>}
          {compass === "unsupported" && <p className="mt-4 text-sm text-[#6b6b80]">Live compass isn't available on this device. Use a compass app and face {bearing.toFixed(0)}° from north.</p>}
        </div>
      )}
      {!l.loc && <p className="mt-6 text-[#3d3d52]">Choose your location to see the Qibla direction.</p>}
    </div>
  );
}
