import React from "react";
import Image from "next/image";
import { Content } from ".";
import { Button, Card, RedirectButton } from "..";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import { RotatingWordsBanner } from "@/app/components";

const words = ["facilidade", "agilidade", "precisão"];

export function PageContent() {
  return (
    <Content.Root>
      <Content.Section>
        <Content.Gap gap="gap-16">
          <Content.Gap gap="gap-12">
            <Content.Gap gap="gap-6">
              <Content.Gap gap="gap-4">
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
                <RedirectButton />
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
            <video
              autoPlay
              muted
              loop
              className="w-full rounded-3xl"
              src="/searchcast_motion_design.mp4"
              controls
            />
          </div>
        </Content.Gap>
      </Content.Section>
      <Content.Section>
        <div className="flex flex-col items-center justify-center gap-4 border-t border-gray-800 bg-background py-16 text-center md:mx-16 md:py-24">
          <Content.Gap gap="gap-8">
            <div className="text-text-secondary">
              Os principais podcasts do Youtube
            </div>
            <div className="flex justify-center gap-11">
              <a target="_blank" href="https://www.youtube.com/@FlowPodcast">
                <Image
                  priority
                  className="rounded-full"
                  src="/flow_podcast.jpg"
                  width={80}
                  height={80}
                  placeholder="empty"
                  title="Flow Podcast"
                  alt="Flow Podcast"
                />
              </a>
              <a
                target="_blank"
                href="https://www.youtube.com/@inteligencialtda"
              >
                <Image
                  priority
                  className="rounded-full"
                  src="/inteligencia_ltda_podcast.jpg"
                  width={80}
                  height={80}
                  placeholder="empty"
                  title="Inteligência LTDA Podcast"
                  alt="Inteligência LTDA Podcast"
                />
              </a>
              <a target="_blank" href="https://www.youtube.com/@Podpah">
                <Image
                  priority
                  className="rounded-full"
                  src="/podpah_podcast.jpg"
                  width={80}
                  height={80}
                  placeholder="empty"
                  title="Podpah Podcast"
                  alt="Podpah Podcast"
                />
              </a>
              <a
                target="_blank"
                className="hidden md:block"
                href="https://www.youtube.com/@podpeopleanabeatriz"
              >
                <Image
                  priority
                  className="rounded-full"
                  src="/podpeople_podcast.jpg"
                  width={80}
                  height={80}
                  placeholder="empty"
                  title="Podpeople Podcast"
                  alt="Podpeople Podcast"
                />
              </a>
              <a
                target="_blank"
                className="hidden md:block"
                href="https://www.youtube.com/@renatocariani"
              >
                <Image
                  priority
                  className="rounded-full"
                  src="/renato_cariani_podcast.jpg"
                  width={80}
                  height={80}
                  placeholder="empty"
                  title="Renato Cariani Podcast"
                  alt="Renato Cariani Podcast"
                />
              </a>
              <a
                target="_blank"
                className="hidden md:block"
                href="https://www.youtube.com/@PrimoCast"
              >
                <Image
                  priority
                  className="rounded-full"
                  src="/primo_cast_podcast.jpg"
                  width={80}
                  height={80}
                  placeholder="empty"
                  title="Primo Cast Podcast"
                  alt="Primo Cast Podcast"
                />
              </a>
              <a
                target="_blank"
                className="hidden md:block"
                href="https://www.youtube.com/@JoelJota"
              >
                <Image
                  priority
                  className="rounded-full"
                  src="/joel_jota_podcast.jpg"
                  width={80}
                  height={80}
                  placeholder="empty"
                  title="Joel Jota Podcast"
                  alt="Joel Jota Podcast"
                />
              </a>
              <a
                target="_blank"
                className="hidden md:block"
                href="https://www.youtube.com/@FlowGamesPodcast"
              >
                <Image
                  priority
                  className="rounded-full"
                  src="/flow_games_podcast.jpg"
                  width={80}
                  height={80}
                  placeholder="empty"
                  title="Flow Games Podcast"
                  alt="Flow Games Podcast"
                />
              </a>
              <a
                target="_blank"
                className="hidden md:block"
                href="https://www.youtube.com/@ossocios"
              >
                <Image
                  priority
                  className="rounded-full"
                  src="/os_socios_podcast.jpg"
                  width={80}
                  height={80}
                  placeholder="empty"
                  title="Os Sócios Podcast"
                  alt="Os Sócios Podcast"
                />
              </a>
            </div>
          </Content.Gap>
        </div>
      </Content.Section>
      <Content.Section>
        <div className="mx-auto my-10 flex max-w-[1115px] flex-col items-center justify-center gap-4 border-t border-gray-800 bg-background py-16 text-center md:py-24">
          <Content.Gap gap="gap-16">
            <Content.Gap gap="gap-5">
              <Content.Gap gap="gap-3">
                <div className="text-gray-300">Diferenciais</div>
                <div className="font-inter text-center text-4xl font-semibold leading-tight tracking-tight">
                  Por que SearchCast?
                </div>
              </Content.Gap>
              <div className="font-inter max-w-3xl text-center text-xl font-normal leading-7 text-text-secondary">
                Nossa tecnologia de busca inovadora vasculha o universo dos
                podcasts para trazer a você exatamente o que você está
                procurando.
              </div>
            </Content.Gap>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Card
                iconSrc="/chat_icon.svg"
                title="Sugestões Personalizadas"
                description="Receba recomendações adaptadas às suas preferências e histórico de busca."
              />
              <Card
                iconSrc="/essential_icon.svg"
                title="Variedade e Qualidade"
                description="Acesso a uma vasta gama de podcasts de alta qualidade de todas as categorias imagináveis."
              />
              <Card
                iconSrc="/interface_icon.svg"
                title="Sem Complicações"
                description="Interface limpa e intuitiva que torna a busca e a audição de podcasts uma brisa."
              />
            </div>
          </Content.Gap>
        </div>
      </Content.Section>
      <Content.Section>
        <div className="mx-auto flex max-w-[1115px] flex-col items-center justify-center gap-4 rounded-2xl bg-dark-gray px-4 py-8 text-center md:px-8 md:py-20">
          <Content.Gap gap="gap-8">
            <div className="leading-15 max-w-3xl text-2xl font-normal tracking-tight md:ml-8 md:text-4xl">
              “A plataforma me ajudou a encontrar vários podcast sobre os
              assuntos desejados”
            </div>
            <ProfileCard
              profileSrc="/sample_user_avatar.png"
              name="Pedro freitas"
              role="Editor de vídeo"
            />
          </Content.Gap>
        </div>
      </Content.Section>
      <Content.Section>
        <div className="mx-auto my-16 flex max-w-[1115px] flex-col items-center justify-center gap-4 rounded-2xl bg-dark-gray px-4 py-8 text-center md:px-8 md:py-20">
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
                  contato conosco por e-mail, Instagram ou WhatsApp.
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
      <Content.Section>
        <div className="mx-auto flex max-w-[1115px] flex-col items-center justify-center gap-4 border-t border-gray-800 bg-background py-16 text-center md:py-24">
          <Content.Gap gap="gap-16">
            <Content.Gap gap="gap-5">
              <Content.Gap gap="gap-3">
                <div className="text-gray-300">Entre em contato</div>
                <div className="font-inter text-center text-4xl font-semibold leading-tight tracking-tight">
                  Entre em contato conosco
                </div>
              </Content.Gap>
              <div className="font-inter max-w-3xl text-center text-xl font-normal leading-7 text-text-secondary">
                Nosso time está aqui para atendê-lo.
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
