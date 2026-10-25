import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Lets phones add ofbuilder.com to the home screen with the OfBuilder icon and colours.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OfBuilder",
    short_name: "OfBuilder",
    description: "Apps that help you learn, pass, sleep and grow. Free mock tests for citizenship, driving theory and CompTIA exams.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffbf5",
    theme_color: "#0f0f1a",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
