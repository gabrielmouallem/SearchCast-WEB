import React from "react";
import Image from "next/image";
import { Content } from ".";
import { Button, Card, LinkCarousel, RedirectButton } from "..";
import { RotatingWordsBanner } from "@/app/components";
import { MotionVideo } from "./components/MotionVideo";

const words = ["facilidade", "agilidade", "precisão"];

const PODCASTS = [
  {
    href: "https://www.youtube.com/@FlowPodcast",
    src: "/flow_podcast.jpg",
    title: "Flow Podcast",
    alt: "Flow Podcast",
  },
  {
    href: "https://www.youtube.com/@inteligencialtda",
    src: "/inteligencia_ltda_podcast.jpg",
    title: "Inteligência LTDA Podcast",
    alt: "Inteligência LTDA Podcast",
  },
  {
    href: "https://www.youtube.com/@Podpah",
    src: "/podpah_podcast.jpg",
    title: "Podpah Podcast",
    alt: "Podpah Podcast",
  },
  {
    href: "https://www.youtube.com/@podpeopleanabeatriz",
    src: "/podpeople_podcast.jpg",
    title: "Podpeople Podcast",
    alt: "Podpeople Podcast",
  },
  {
    href: "https://www.youtube.com/@renatocariani",
    src: "/renato_cariani_podcast.jpg",
    title: "Renato Cariani Podcast",
    alt: "Renato Cariani Podcast",
  },
  {
    href: "https://www.youtube.com/@PrimoCast",
    src: "/primo_cast_podcast.jpg",
    title: "Primo Cast Podcast",
    alt: "Primo Cast Podcast",
  },
  {
    href: "https://www.youtube.com/@JoelJota",
    src: "/joel_jota_podcast.jpg",
    title: "Joel Jota Podcast",
    alt: "Joel Jota Podcast",
  },
  {
    href: "https://www.youtube.com/@FlowGamesPodcast",
    src: "/flow_games_podcast.jpg",
    title: "Flow Games Podcast",
    alt: "Flow Games Podcast",
  },
  {
    href: "https://www.youtube.com/@ossocios",
    src: "/os_socios_podcast.jpg",
    title: "Os Sócios Podcast",
    alt: "Os Sócios Podcast",
  },
];

export function PageContent() {
  return (
    <Content.Root>
      <Content.Section defaultPadding>
        <Content.Gap gap="gap-16">
          <Content.Gap gap="gap-12">
            <Content.Gap gap="gap-6">
              <Content.Gap>
                <a
                  className="flex w-full cursor-pointer items-center justify-center"
                  href="/login"
                >
                  <Image
                    className="mb-4 block sm:hidden"
                    src="/logo_w_name.svg"
                    width={230}
                    height={30}
                    alt="SearchCast Logo"
                  />
                </a>
                <div className="mb-4 mt-2 sm:my-0">
                  <RedirectButton />
                </div>
                <RotatingWordsBanner words={words} />
              </Content.Gap>
              <Content.Gap>
                <div className="font-inter max-w-3xl text-center text-base font-normal leading-7 text-text-secondary md:text-xl">
                  Com o SearchCast, a busca pelo conteúdo de áudio que você
                  adora é tão fácil quanto digitar uma palavra-chave.
                </div>
              </Content.Gap>
            </Content.Gap>
            <div className="flex flex-col items-center justify-center gap-2.5 md:flex-row">
              <a href="/guide">
                <Button className="w-72 px-4 py-4 text-lg md:w-auto">
                  Saiba mais
                </Button>
              </a>

              <a href="/register">
                <Button className="w-72 !bg-brand px-4 py-4 text-lg md:w-auto">
                  Experimentar
                </Button>
              </a>
            </div>
          </Content.Gap>
          <div className="mx-auto flex max-w-[1115px] items-center justify-center">
            <MotionVideo />
          </div>
        </Content.Gap>
      </Content.Section>
      <Content.Section>
        <div className="flex flex-col items-center justify-center gap-4 bg-[#0C111D] bg-gradient-to-b from-[#0C111D] via-[rgba(0,158,164,0.085)] to-[rgba(0,158,164,0.085)] px-4 py-16 text-center md:px-0 md:py-24">
          <Content.Gap gap="gap-8">
            <div className="-mb-8 text-lg font-normal text-text-primary">
              <b className="text-4xl font-extrabold">5.500+</b> episódios e
              crescendo
            </div>
            <div className="text-text-secondary">
              Dos melhores e mais polêmicos podcasts do YouTube
            </div>
            <div className="flex items-center justify-center">
              <LinkCarousel>
                {PODCASTS.map(({ href, src, title, alt }) => (
                  <a key={title} target="_blank" href={href}>
                    <Image
                      priority
                      className="rounded-full"
                      src={src}
                      width={80}
                      height={80}
                      placeholder="empty"
                      title={title}
                      alt={alt}
                    />
                  </a>
                ))}
              </LinkCarousel>
            </div>
          </Content.Gap>
        </div>
      </Content.Section>
      <Content.Section>
        <div className="mb-20 bg-[#0C111D] bg-gradient-to-b from-[rgba(0,158,164,0.085)] via-[rgba(0,158,164,0.085)] to-[#0C111D] px-8 py-16 text-center md:py-24">
          <Content.Gap gap="gap-16">
            <Content.Gap gap="gap-5">
              <Content.Gap gap="gap-3">
                <div className="text-gray-300">Diferenciais</div>
                <div className="font-inter text-center text-4xl font-semibold leading-tight tracking-tight">
                  Por que SearchCast?
                </div>
              </Content.Gap>
              <div className="mx-auto flex max-w-[1115px] flex-col items-center justify-center gap-14">
                <div className="font-inter max-w-3xl text-center text-xl font-normal leading-7 text-text-secondary">
                  Nossa tecnologia de busca inovadora vasculha o universo dos
                  podcasts para trazer a você exatamente o que você está
                  procurando.
                </div>
              </div>
            </Content.Gap>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Card
                iconSrc="/chat_icon.svg"
                title="Recomendações Personalizadas"
                description="Descubra conteúdos relevantes com base em suas pesquisas e preferências. Encontre os melhores momentos dos podcasts que você ama."
              />
              <Card
                iconSrc="/essential_icon.svg"
                title="Diversidade e Qualidade"
                description="Acesse uma ampla seleção de podcasts de alta qualidade, abrangendo diversas categorias, desde tecnologia até saúde e bem-estar."
              />
              <Card
                iconSrc="/interface_icon.svg"
                title="Fácil de Usar"
                description="Navegue facilmente com nossa interface intuitiva e limpa, projetada para tornar sua experiência de busca e audição mais agradável."
              />
            </div>
          </Content.Gap>
        </div>
      </Content.Section>
      <Content.Section defaultPadding>
        <div className="mx-auto mb-10 flex max-w-[960px] flex-col items-center justify-center gap-4 rounded-2xl bg-background text-center sm:mb-20">
          <Content.Gap gap="gap-16">
            <div className="font-inter text-center text-4xl font-semibold leading-tight tracking-tight">
              Funcionalidades
            </div>
            <div className="font-inter -mt-12 max-w-3xl text-center text-xl font-normal leading-7 text-text-secondary">
              Filtros, sugestões de pesquisa e muito mais!
            </div>

            <div className="grid grid-cols-1 gap-12">
              <video
                autoPlay
                playsInline
                muted
                loop
                className="cursor-pointer rounded-3xl shadow-[0px_10px_30px_10px_rgba(0,0,0,0.5)] contrast-[90%] saturate-50 hover:scale-105 hover:border-2 hover:brightness-100 hover:contrast-100 hover:saturate-100 sm:shadow-none sm:brightness-100 sm:transition sm:duration-500 hover:sm:shadow-[0px_10px_30px_10px_rgba(0,0,0,0.5)]"
                poster="/autosuggestions_placeholder.jpg"
                title="Sugestões automáticas"
                controls={false}
              >
                <source
                  src="/autosuggestions_motion_design.mp4"
                  type="video/mp4"
                />
                <source
                  src="/autosuggestions_motion_design.webm"
                  type="video/webm"
                />
              </video>
              <div className="flex flex-col gap-12 md:grid md:grid-cols-2 md:gap-8">
                <video
                  autoPlay
                  playsInline
                  muted
                  loop
                  className="cursor-pointer rounded-3xl shadow-[0px_10px_30px_10px_rgba(0,0,0,0.5)] contrast-[90%] saturate-50 hover:scale-105 hover:border-2 hover:brightness-100 hover:contrast-100 hover:saturate-100 sm:shadow-none sm:brightness-100 sm:transition sm:duration-500 hover:sm:shadow-[0px_10px_30px_10px_rgba(0,0,0,0.5)]"
                  poster="/improve_search_placeholder.jpg"
                  title="Otimizar pesquisa"
                  controls={false}
                >
                  <source
                    src="/improve_search_motion_design.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="/improve_search_motion_design.webm"
                    type="video/webm"
                  />
                </video>
                <video
                  autoPlay
                  playsInline
                  muted
                  loop
                  className="cursor-pointer rounded-3xl shadow-[0px_10px_30px_10px_rgba(0,0,0,0.5)] contrast-[90%] saturate-50 hover:scale-105 hover:border-2 hover:brightness-100 hover:contrast-100 hover:saturate-100 sm:shadow-none sm:brightness-100 sm:transition sm:duration-500 hover:sm:shadow-[0px_10px_30px_10px_rgba(0,0,0,0.5)]"
                  poster="/order_by_placeholder.jpg"
                  title="Filtros de pesquisa"
                  controls={false}
                >
                  <source src="/order_by_motion_design.mp4" type="video/mp4" />
                  <source
                    src="/order_by_motion_design.webm"
                    type="video/webm"
                  />
                </video>
              </div>
            </div>
          </Content.Gap>
        </div>
      </Content.Section>
      <Content.Section defaultPadding>
        <div className="mx-auto my-16 flex max-w-[960px] flex-col items-center justify-center gap-4 rounded-2xl bg-dark-gray px-4 py-8 text-center md:px-8 md:py-20">
          <Content.Gap gap="gap-8">
            <Image
              src="/avatar_group_icon.svg"
              width={120}
              height={56}
              placeholder="empty"
              alt="Avatar Group"
            />
            <div>
              <Content.Gap gap="gap-2">
                <div className="text-xl font-semibold leading-7">
                  Ficou com dúvidas?
                </div>
                <div className="max-w-3xl text-lg text-text-secondary">
                  Nossa equipe de suporte está pronta para ajudar. Entre em
                  contato conosco por E-mail ou Instagram.
                </div>
              </Content.Gap>
            </div>
            <a
              href={
                "mailto:contato@searchcast.app?subject=Assunto%20da%20Mensagem&body=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20SearchCast.%20Obrigado!"
              }
              target="_blank"
            >
              <Button className="!bg-brand">Entre em contato</Button>
            </a>
          </Content.Gap>
        </div>
      </Content.Section>
      <Content.Section defaultPadding>
        <div className="mx-auto flex max-w-[960px] flex-col items-center justify-center gap-4 border-t border-gray-800 bg-background py-16 text-center md:py-24">
          <Content.Gap gap="gap-16">
            <Content.Gap gap="gap-5">
              <Content.Gap gap="gap-3">
                <div className="text-gray-300">Entre em contato</div>
                <div className="font-inter text-center text-4xl font-semibold leading-tight tracking-tight">
                  Entre em contato conosco
                </div>
              </Content.Gap>
              <div className="font-inter max-w-3xl whitespace-break-spaces text-center text-xl font-normal leading-7 text-text-secondary">
                Nosso time está aqui para{" "}
                <span className="whitespace-nowrap">atendê-lo</span>.
              </div>
            </Content.Gap>
            <div className="flex flex-wrap items-center justify-center gap-10">
              <Card
                iconSrc="/email_icon.svg"
                title="Email"
                description="contato@searchcast.app"
              />
              <Card
                iconSrc="/instagram_icon.svg"
                title="Instagram"
                description="@search.cast"
              />
            </div>
          </Content.Gap>
        </div>
      </Content.Section>
    </Content.Root>
  );
}
