import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Угадай стеки — Звук",
    short_name: "Угадай стеки",
    description: "Угадай стеки — Звук",
    start_url: "/",
    display: "standalone",
    background_color: "#1F1F20",
    theme_color: "#1F1F20",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
