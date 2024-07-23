import { DEFAULT_METADATA_KEYWORDS } from "@/constants";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "SearchCast - Política de Privacidade",
  description: "Política de Privacidade",
  keywords: [
    ...DEFAULT_METADATA_KEYWORDS,
    "politica",
    "privacidade",
    "política privacidade",
    "política de privacidade",
    "termos de uso",
    "termos",
    "aceitar termos",
    "aceitar politica",
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
        <title>SearchCast - Política de Privacidade</title>
      </Head>
      {children}
    </div>
  );
}
