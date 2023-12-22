import Image from "next/image";
import { Content } from ".";
import { Button, Card, RedirectButton } from "..";
import { ProfileCard } from "../ProfileCard/ProfileCard";

export function PageContent() {
  const phoneNumber = "+5535998607515";
  const lernMoreMessage = encodeURIComponent(
    "Olá, gostaria de saber mais sobre a ferramenta SearchCast."
  );
  const questionsMessage = encodeURIComponent(
    "Olá, gostaria de tirar dúvidas sobre a ferramenta SearchCast."
  );
  return (
    <Content.Root>
      <Content.Section>
        <Content.Gap gap="gap-16">
          <Content.Gap gap="gap-12">
            <Content.Gap gap="gap-6">
              <Content.Gap gap="gap-4">
                <RedirectButton />
                <div className="text-text-primary text-center md:text-6xl text-3xl font-semibold leading-tight tracking-tight max-w-4xl">
                  Encontre o podcast perfeito com facilidade
                </div>
              </Content.Gap>
              <Content.Gap>
                <div className="text-text-secondary text-center font-inter md:text-xl text-base font-normal leading-7 max-w-3xl">
                  Com o SearchCast, a busca pelo conteúdo de áudio que você
                  adora é tão fácil quanto digitar uma palavra-chave.
                </div>
              </Content.Gap>
            </Content.Gap>
            <div className="flex items-center flex-col md:flex-row justify-center gap-2.5">
              <a
                href={`https://wa.me/${phoneNumber}?text=${lernMoreMessage}`}
                target="_blank"
              >
                <Button className="px-4 py-4 text-lg w-full md:w-auto">
                  Saiba mais
                </Button>
              </a>

              <a
                href={`https://wa.me/${phoneNumber}?text=${questionsMessage}`}
                target="_blank"
              >
                <Button className="px-4 py-4 !bg-brand text-lg w-full md:w-auto">
                  Entre em contato
                </Button>
              </a>
            </div>
          </Content.Gap>
          <div className="flex items-center justify-center">
            <Image
              className="md:block hidden"
              src="/half_macbook_frame_w_login_page.png"
              width={1190}
              height={1190}
              placeholder="empty"
              priority
              alt="Macbook"
            />
            <Image
              className="md:hidden block"
              src="/macbook_frame_w_login_page.png"
              width={1190}
              height={1190}
              placeholder="empty"
              priority
              alt="Macbook"
            />
          </div>
        </Content.Gap>
      </Content.Section>
      <Content.Section>
        <div className="py-16 md:py-24 border-t border-gray-800 flex text-center justify-center items-center bg-background flex-col gap-4 md:mx-16">
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
        <div className="py-16 md:py-24 border-t border-gray-800 flex text-center justify-center items-center bg-background flex-col gap-4 md:mx-16">
          <Content.Gap gap="gap-16">
            <Content.Gap gap="gap-5">
              <Content.Gap gap="gap-3">
                <div className="text-gray-300">Diferenciais</div>
                <div className="text-center font-inter text-4xl font-semibold leading-tight tracking-tight">
                  Por que SearchCast?
                </div>
              </Content.Gap>
              <div className="text-center text-text-secondary font-inter text-xl font-normal leading-7 max-w-3xl">
                Nossa tecnologia de busca inovadora vasculha o universo dos
                podcasts para trazer a você exatamente o que você está
                procurando.
              </div>
            </Content.Gap>
            <div className="flex gap-6 items-center justify-center flex-wrap">
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
        <Content.Gap
          gap="gap-8"
          className="py-24 bg-dark-gray flex -mx-8 items-center content-center text-center"
        >
          <div className="text-5xl max-w-6xl font-normal leading-15 tracking-tight md:ml-8">
            “A plataforma me ajudou a encontrar vários podcast sobre os assuntos
            desejados”
          </div>
          <ProfileCard
            profileSrc="/sample_user_avatar.png"
            name="Pedro freitas"
            role="Editor de vídeo"
          />
        </Content.Gap>
      </Content.Section>
      <Content.Section>
        <div className="my-16 md:py-8 md:px-8 px-4 py-8 rounded-2xl bg-dark-gray flex text-center justify-center items-center flex-col gap-4">
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
                <div className="font-semibold text-xl leading-7">
                  Ficou com dúvidas?
                </div>
                <div className="text-text-secondary text-lg max-w-3xl">
                  Nossa equipe de suporte está pronta para ajudar. Entre em
                  contato conosco por e-mail, Instagram ou WhatsApp.
                </div>
              </Content.Gap>
            </div>
            <a
              href={`https://wa.me/${phoneNumber}?text=${lernMoreMessage}`}
              target="_blank"
            >
              <Button className="!bg-brand">Entre em contato</Button>
            </a>
          </Content.Gap>
        </div>
      </Content.Section>
      <Content.Section>
        <div className="py-16 md:py-24 border-t border-gray-800 flex text-center justify-center items-center bg-background flex-col gap-4 md:mx-16">
          <Content.Gap gap="gap-16">
            <Content.Gap gap="gap-5">
              <Content.Gap gap="gap-3">
                <div className="text-gray-300">Entre em contato</div>
                <div className="text-center font-inter text-4xl font-semibold leading-tight tracking-tight">
                  Entre em contato conosco
                </div>
              </Content.Gap>
              <div className="text-center text-text-secondary font-inter text-xl font-normal leading-7 max-w-3xl">
                Nosso time está aqui para atende-lo.
              </div>
            </Content.Gap>
            <div className="flex gap-6 items-center justify-center flex-wrap">
              <Card
                iconSrc="/email_icon.svg"
                title="Email"
                description="Em breve"
              />
              <Card
                iconSrc="/instagram_icon.svg"
                title="Instagram"
                description="Em breve"
              />
              <Card
                iconSrc="/whatsapp_icon.svg"
                title="Whatsapp"
                description="+55 (35) 998607515"
              />
            </div>
          </Content.Gap>
        </div>
      </Content.Section>
    </Content.Root>
  );
}
