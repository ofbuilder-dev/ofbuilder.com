"use client";

import { LazyMotion } from "framer-motion";

const loadFeatures = () => import("./motionFeatures").then((m) => m.default);

// Animations use the lightweight `m` components; the animation engine downloads after first paint,
// so it doesn't delay the page's main content.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
