import { Footer, Navbar } from "@/components";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { DEFAULT_METADATA_KEYWORDS } from "@/constants";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "SearchCast - Meu Perfil",
  description: "Meu Perfil",
  keywords: [...DEFAULT_METADATA_KEYWORDS, "profile", "perfil", "meu perfil"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Head>
        <title>SearchCast - Meu Perfil</title>
      </Head>
      <Navbar isAuthenticated />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </div>
  );
}
