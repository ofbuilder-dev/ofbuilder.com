"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Counts the leading number in `value` up from 0 when scrolled into view ("1,000+" → 0…1,000+).
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^([\d,.]+)(.*)$/);
  const target = match ? parseFloat(match[1].replace(/,/g, "")) : 0;
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const [display, setDisplay] = useState(match ? "0" + match[2] : value);

  useEffect(() => {
    if (!inView || !match) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + match[2]),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <span ref={ref}>{display}</span>;
}
