import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pulse Manila 2026",
    short_name: "Pulse",
    description:
      "A mobile-first convention companion for schedules, updates, room lookup, and ASPAC highlights.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5efe2",
    theme_color: "#0c7a60",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/maskable-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
