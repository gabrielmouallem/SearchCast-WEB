import { PageContent } from "@/components/Content/PageContent";
import { makeSUT } from "@/test-utils";

describe("PageContent Component", () => {
  it("should render the RedirectButton", () => {
    const { getByText } = makeSUT(PageContent, {}, { noWrappers: true });
    const redirectButton = getByText("Sugestões de busca");

    expect(redirectButton).toBeInTheDocument();
  });

  it("should render the main title", () => {
    const { getByText } = makeSUT(PageContent, {}, { noWrappers: true });
    const mainTitle = getByText("Encontre o podcast perfeito com facilidade");

    expect(mainTitle).toBeInTheDocument();
    expect(mainTitle).toHaveClass(
      "max-w-4xl text-center text-3xl font-semibold leading-tight tracking-tight text-text-primary md:text-6xl",
    );
  });

  it("should render the main description", () => {
    const { getByText } = makeSUT(PageContent, {}, { noWrappers: true });
    const mainDescription = getByText(
      "Com o SearchCast, a busca pelo conteúdo de áudio que você adora é tão fácil quanto digitar uma palavra-chave.",
    );

    expect(mainDescription).toBeInTheDocument();
    expect(mainDescription).toHaveClass(
      "font-inter max-w-3xl text-center text-base font-normal leading-7 text-text-secondary md:text-xl",
    );
  });

  it("should render the Saiba mais button", () => {
    const { getByText } = makeSUT(PageContent, {}, { noWrappers: true });
    const learnMoreButton = getByText("Saiba mais");

    expect(learnMoreButton).toBeInTheDocument();
    expect(learnMoreButton.closest("a")).toHaveAttribute(
      "href",
      "https://wa.me/+5535998607515?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20ferramenta%20SearchCast.",
    );
  });

  it("should render the Entre em contato top button", () => {
    const { getAllByText } = makeSUT(PageContent, {}, { noWrappers: true });
    const contactButtons = getAllByText("Entre em contato");
    const contactButtonTop = contactButtons[0];

    expect(contactButtonTop).toBeInTheDocument();
    expect(contactButtonTop.closest("a")).toHaveAttribute(
      "href",
      "https://wa.me/+5535998607515?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20a%20ferramenta%20SearchCast.",
    );
  });

  it("should render the Entre em contato bottom button", () => {
    const { getAllByText } = makeSUT(PageContent, {}, { noWrappers: true });
    const contactButtons = getAllByText("Entre em contato");
    const contactButtonBottom = contactButtons[1];

    expect(contactButtonBottom).toBeInTheDocument();
    expect(contactButtonBottom.closest("a")).toHaveAttribute(
      "href",
      "https://wa.me/+5535998607515?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20ferramenta%20SearchCast.",
    );
  });

  it("should render the video element", () => {
    const { container } = makeSUT(PageContent, {}, { noWrappers: true });
    const video = container.querySelector("video");

    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("src", "/searchcast_motion_design.mp4");
  });

  it("should render podcast images", () => {
    const { getByTitle } = makeSUT(PageContent, {}, { noWrappers: true });

    const flowPodcast = getByTitle("Flow Podcast");
    const inteligenciaPodcast = getByTitle("Inteligência LTDA Podcast");
    const podpahPodcast = getByTitle("Podpah Podcast");

    expect(flowPodcast).toBeInTheDocument();
    expect(inteligenciaPodcast).toBeInTheDocument();
    expect(podpahPodcast).toBeInTheDocument();
  });

  it("should render Diferenciais section", () => {
    const { getByText } = makeSUT(PageContent, {}, { noWrappers: true });
    const diferenciaisTitle = getByText("Por que SearchCast?");
    const diferenciaisDescription = getByText(
      "Nossa tecnologia de busca inovadora vasculha o universo dos podcasts para trazer a você exatamente o que você está procurando.",
    );

    expect(diferenciaisTitle).toBeInTheDocument();
    expect(diferenciaisDescription).toBeInTheDocument();
  });

  it("should render the profile card", () => {
    const { getByText, getByAltText } = makeSUT(
      PageContent,
      {},
      { noWrappers: true },
    );
    const profileName = getByText("Pedro freitas");
    const profileRole = getByText("Editor de vídeo");
    const profileImage = getByAltText("Profile Card Icon");

    expect(profileName).toBeInTheDocument();
    expect(profileRole).toBeInTheDocument();
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute(
      "src",
      "/_next/image?url=%2Fsample_user_avatar.png&w=128&q=75",
    );
  });

  it("should render the final contact section", () => {
    const { getByText } = makeSUT(PageContent, {}, { noWrappers: true });
    const contactTitle = getByText("Entre em contato conosco");
    const contactDescription = getByText(
      "Nosso time está aqui para atende-lo.",
    );

    expect(contactTitle).toBeInTheDocument();
    expect(contactDescription).toBeInTheDocument();
  });

  it("should render the final contact options", () => {
    const { getByText } = makeSUT(PageContent, {}, { noWrappers: true });
    const emailOption = getByText("Email");
    const instagramOption = getByText("Instagram");
    const whatsappOption = getByText("Whatsapp");

    expect(emailOption).toBeInTheDocument();
    expect(instagramOption).toBeInTheDocument();
    expect(whatsappOption).toBeInTheDocument();
  });
});
