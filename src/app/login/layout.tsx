import { Footer, Navbar } from "@/components";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { DEFAULT_METADATA_KEYWORDS } from "@/constants";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "SearchCast - Acessar",
  description: "Faça o seu login",
  keywords: [
    ...DEFAULT_METADATA_KEYWORDS,
    "login",
    "entrar",
    "cadastrar",
    "registrar",
    "logon",
    "acessar",
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
        <title>SearchCast - Faça o seu login</title>
      </Head>
      <Navbar />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </>
  );
}
