import { Navbar, Content, RedirectButton, Button } from "@/components";

export default function Home() {
  return (
    <main className="pt-20">
      <Navbar />
      <Content.Root>
        <Content.Section>
          <Content.Gap gap="gap-12">
            <Content.Gap gap="gap-6">
              <Content.Gap gap="gap-4">
                <RedirectButton />
                <div className="text-text-primary text-center text-6xl font-semibold leading-tight tracking-tight max-w-4xl">
                  Encontre o podcast perfeito com facilidade
                </div>
              </Content.Gap>
              <Content.Gap>
                <div className="text-text-secondary text-center font-inter text-xl font-normal leading-7 max-w-3xl">
                  Com o SearchCast, a busca pelo conteúdo de áudio que você
                  adora é tão fácil quanto digitar uma palavra-chave.
                </div>
              </Content.Gap>
            </Content.Gap>
            <div className="flex items-center justify-center gap-2.5">
              <Button className="px-4 py-4 text-lg">Saiba mais</Button>
              <Button className="px-4 py-4 bg-brand text-lg">
                Entre em contato
              </Button>
            </div>
          </Content.Gap>
        </Content.Section>
      </Content.Root>
    </main>
  );
}
