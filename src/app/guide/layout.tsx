import { DEFAULT_METADATA_KEYWORDS } from "@/constants";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "SearchCast - Sobre a Plataforma",
  description: "Sobre a Plataforma",
  keywords: [
    ...DEFAULT_METADATA_KEYWORDS,
    "docs",
    "guia",
    "ajuda",
    "como usar",
    "sobre a plataforma",
    "sobre",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Head>
        <title>SearchCast - Sobre a Plataforma</title>
      </Head>
      {children}
    </div>
  );
}
