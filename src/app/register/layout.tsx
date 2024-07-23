import { DEFAULT_METADATA_KEYWORDS } from "@/constants";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "SearchCast - Cadastre-se",
  description: "Cadastre-se",
  keywords: [
    ...DEFAULT_METADATA_KEYWORDS,
    "cadastro",
    "cadastrar",
    "cadastre-se",
    "registrar",
    "registro",
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
        <title>SearchCast - Cadastre-se</title>
      </Head>
      {children}
    </div>
  );
}
