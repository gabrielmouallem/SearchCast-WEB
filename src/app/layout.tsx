import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SearchCast",
  description: "Encontre o podcast perfeito com facilidade",
  keywords: [
    "podcast",
    "searchcast",
    "search cast",
    "Search Cast",
    "search-cast",
    "cortes de podcasts",
    "cortes de podcast",
    "cortes podcast",
    "criação de conteúdo",
    "criacao de conteudo",
    "Descubra destaques em podcasts",
    "destaque podcast",
    "Busca eficiente de segmentos de podcast",
    "busca eficiente podcast",
    "Explore transcrições de podcasts",
    "explorar transcrições podcast",
    "Acesse momentos específicos em vídeos",
    "acesso momentos específicos podcast",
    "Experiência aprimorada de escuta",
    "experiência aprimorada podcast",
    "Tecnologias inovadoras em descoberta de conteúdo",
    "tecnologias inovadoras descoberta podcast",
    "Descubra podcasts destacados",
    "descobrir podcasts destacados",
    "Busca direcionada em transcrições",
    "busca direcionada transcrições podcast",
    "Links diretos para momentos específicos",
    "links diretos momentos específicos podcast",
    "Descubra e compartilhe trechos de podcasts",
    "descobrir compartilhar trechos podcasts",
    "Inovação em descoberta de conteúdo",
    "inovação descoberta conteúdo",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="dark">{children}</body>
    </html>
  );
}
