import { DEFAULT_METADATA_KEYWORDS } from "@/constants";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "SearchCast - Mudar Senha",
  description: "Mudar senha",
  keywords: [
    ...DEFAULT_METADATA_KEYWORDS,
    "mudar senha",
    "alterar senha",
    "esqueci senha",
    "esqueci minha senha",
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
        <title>SearchCast - Mudar Senha</title>
      </Head>
      {children}
    </div>
  );
}
