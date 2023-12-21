import Image from "next/image";
import { Content } from ".";
import { Button, RedirectButton } from "..";

export function PageContent() {
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
            <div className="flex items-center justify-center gap-2.5">
              <Button className="px-4 py-4 text-lg">Saiba mais</Button>
              <Button className="px-4 py-4 !bg-brand text-lg">
                Entre em contato
              </Button>
            </div>
          </Content.Gap>
          <div className="flex items-center justify-center">
            <Image
              className="md:block hidden"
              src="/half_macbook_frame_w_login_page.png"
              width={1190}
              height={1190}
              placeholder="empty"
              alt="Macbook"
            />
            <Image
              className="md:hidden block"
              src="/macbook_frame_w_login_page.png"
              width={1190}
              height={1190}
              placeholder="empty"
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
            <div className="flex align-center justify-center gap-11">
              <a target="_blank" href="https://www.youtube.com/@FlowPodcast">
                <Image
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
    </Content.Root>
  );
}
