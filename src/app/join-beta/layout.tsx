import { Footer, Navbar } from "@/components";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { DEFAULT_METADATA_KEYWORDS } from "@/constants";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "SearchCast - Participar do Beta",
  description:
    "Participe do nosso programa beta e ajude a moldar o futuro do SearchCast",
  keywords: [
    ...DEFAULT_METADATA_KEYWORDS,
    "beta",
    "participar do beta",
    "acesso antecipado",
    "teste beta",
    "feedback",
    "desenvolvimento de produto",
    "teste de usuário",
    "prévia",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar isAuthenticated />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </div>
  );
}
