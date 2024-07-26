import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SearchCast",
    short_name: "SearchCast",
    description: "Encontre o podcast perfeito com facilidade",
    start_url: "/",
    display: "fullscreen",
    background_color: "#0C111D",
    theme_color: "#0C111D",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
