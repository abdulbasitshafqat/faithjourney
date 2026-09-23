import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Faith Journey Pro",
    short_name: "Faith Journey",
    description: "Quran, authentic Hadith, prayer times, duas, and Islamic guides in one calm companion.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0b1512",
    theme_color: "#0f766e",
    categories: ["lifestyle", "education", "books"],
    icons: [
      {
        src: "/icon.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
