import { DEFAULT_METADATA_KEYWORDS } from "@/constants";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "SearchCast - Planos",
  description: "Planos",
  keywords: [
    ...DEFAULT_METADATA_KEYWORDS,
    "planos",
    "assinatura",
    "pagamento",
    "assinar",
    "plano mensal",
    "plano semestral",
    "plano anual",
    "mensal",
    "semestral",
    "anual",
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
        <title>SearchCast - Planos</title>
      </Head>
      {children}
    </div>
  );
}
