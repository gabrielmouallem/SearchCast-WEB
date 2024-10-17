import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { DEFAULT_METADATA_KEYWORDS } from "@/constants";
import { getAppURL } from "@/utils/shared";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SearchCast",
  description: "Encontre o podcast perfeito com facilidade",
  keywords: [...DEFAULT_METADATA_KEYWORDS],
  metadataBase: new URL(getAppURL()),
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Image preloads */}
        <link rel="preload" href="/logo_w_name.svg" as="image" />
        <link rel="preload" href="/logo.svg" as="image" />
        <link rel="preload" href="/person_icon.svg" as="image" />
        <link rel="preload" href="/arrow_right_icon.svg" as="image" />
        <link rel="preload" href="/dot_icon.svg" as="image" />
        <link rel="preload" href="/bg_pattern.svg" as="image" />
        <link rel="preload" href="/google_logo_icon.svg" as="image" />
        <link rel="preload" href="/avatar_group_icon.svg" as="image" />
        <link rel="preload" href="/email_icon.svg" as="image" />
        <link rel="preload" href="/instagram_icon.svg" as="image" />
        <link rel="preload" href="/chat_icon.svg" as="image" />
        <link rel="preload" href="/essential_icon.svg" as="image" />
        <link rel="preload" href="/interface_icon.svg" as="image" />

        {/* Video preloads */}
        <link
          rel="preload"
          href="/heavy_presentation_motion_design_1080.mp4"
          as="video"
          type="video/mp4"
        />
        <link
          rel="preload"
          href="/heavy_presentation_motion_design_1080.webm"
          as="video"
          type="video/webm"
        />
        <link
          rel="preload"
          href="/autosuggestions_motion_design.mp4"
          as="video"
          type="video/mp4"
        />
        <link
          rel="preload"
          href="/autosuggestions_motion_design.webm"
          as="video"
          type="video/webm"
        />
        <link
          rel="preload"
          href="/improve_search_motion_design.mp4"
          as="video"
          type="video/mp4"
        />
        <link
          rel="preload"
          href="/improve_search_motion_design.webm"
          as="video"
          type="video/webm"
        />
        <link
          rel="preload"
          href="/order_by_motion_design.mp4"
          as="video"
          type="video/mp4"
        />
        <link
          rel="preload"
          href="/order_by_motion_design.webm"
          as="video"
          type="video/webm"
        />

        {/* Video poster image preloads */}
        <link rel="preload" href="/presentation_placeholder.jpg" as="image" />
        <link
          rel="preload"
          href="/autosuggestions_placeholder.jpg"
          as="image"
        />
        <link rel="preload" href="/improve_search_placeholder.jpg" as="image" />
        <link rel="preload" href="/order_by_placeholder.jpg" as="image" />

        {/* Lottie animation preload */}
        <link
          rel="preload"
          href="/logo_lottie_animation.json"
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.className} dark bg-background bg-pattern bg-contain bg-top-center bg-no-repeat pt-28 md:bg-auto`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_TAG_ID} />
    </html>
  );
}
