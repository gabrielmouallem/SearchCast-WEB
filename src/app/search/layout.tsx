import { DEFAULT_METADATA_KEYWORDS } from "@/constants";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "SearchCast - Pesquisar",
  description: "Pesquisar",
  keywords: [
    ...DEFAULT_METADATA_KEYWORDS,
    "search",
    "pesquisar",
    "pesquisa",
    "pesquisar podcast",
    "encontrar podcast",
    "encontrar clipe",
    "pesquisar clipe",
    "pesquisa",
    "resultados podcast",
    "resultado podcast",
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
        <title>SearchCast - Pesquisar</title>
      </Head>
      {children}
    </div>
  );
}
