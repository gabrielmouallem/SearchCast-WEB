import { Footer, Navbar } from "@/components";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { DEFAULT_METADATA_KEYWORDS } from "@/constants";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "SearchCast - Erro",
  description: "Erro",
  keywords: [
    ...DEFAULT_METADATA_KEYWORDS,
    "error",
    "erro",
    "not found",
    "página não encontrada",
    "não encontrada",
    "página não existe",
    "não existe",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>SearchCast - Erro</title>
      </Head>
      <Navbar />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </>
  );
}
