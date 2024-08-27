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
      <body
        className={`${inter.className} dark bg-background bg-pattern bg-contain bg-top-center bg-no-repeat pt-28 md:bg-auto`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_TAG_ID} />
    </html>
  );
}
