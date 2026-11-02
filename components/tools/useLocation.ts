"use client";

import { useEffect, useState } from "react";

export type Loc = { lat: number; lng: number; label: string };
const KEY = "ofb-location";

// Visitor's location for prayer times and Qibla: browser location, or typed coordinates. Saved on this device only.
export function useLocation() {
  const [loc, setLoc] = useState<Loc | null>(null);
  const [status, setStatus] = useState<"idle" | "asking" | "denied">("idle");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setLoc(JSON.parse(saved));
    } catch {
      /* nothing saved */
    }
  }, []);

  const save = (l: Loc) => {
    setLoc(l);
    try {
      localStorage.setItem(KEY, JSON.stringify(l));
    } catch {
      /* not remembered */
    }
  };

  const locate = () => {
    if (!navigator.geolocation) return setStatus("denied");
    setStatus("asking");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setStatus("idle");
        save({ lat: +p.coords.latitude.toFixed(4), lng: +p.coords.longitude.toFixed(4), label: "Your location" });
      },
      () => setStatus("denied"),
      { timeout: 10000 },
    );
  };

  return { loc, status, locate, save };
}
