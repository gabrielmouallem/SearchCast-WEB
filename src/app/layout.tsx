import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DEFAULT_METADATA_KEYWORDS } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SearchCast",
  description: "Encontre o podcast perfeito com facilidade",
  keywords: [...DEFAULT_METADATA_KEYWORDS],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} dark bg-background bg-pattern bg-contain bg-top-center bg-no-repeat md:bg-auto`}
      >
        {children}
      </body>
    </html>
  );
}
