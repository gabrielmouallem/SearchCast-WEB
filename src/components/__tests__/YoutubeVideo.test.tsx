import { YoutubeVideo } from "@/components/YoutubeVideo"; // Adjust the path accordingly
import { makeSUT } from "@/test-utils";

describe("YoutubeVideo Component", () => {
  it("should render an iframe with the correct src", () => {
    const videoId = "dQw4w9WgXcQ";
    const { getByTitle } = makeSUT(
      YoutubeVideo,
      { videoId },
      { noWrappers: true },
    );
    const iframeElement = getByTitle("YouTube video player");

    expect(iframeElement).toBeInTheDocument();
    expect(iframeElement).toHaveAttribute(
      "src",
      `https://www.youtube.com/embed/${videoId}`,
    );
  });

  it("should have the correct classes applied", () => {
    const videoId = "dQw4w9WgXcQ";
    const { getByTitle } = makeSUT(
      YoutubeVideo,
      { videoId },
      { noWrappers: true },
    );
    const iframeElement = getByTitle("YouTube video player");

    expect(iframeElement).toHaveClass("h-full w-full");
  });

  it("should allow fullscreen", () => {
    const videoId = "dQw4w9WgXcQ";
    const { getByTitle } = makeSUT(
      YoutubeVideo,
      { videoId },
      { noWrappers: true },
    );
    const iframeElement = getByTitle("YouTube video player");

    expect(iframeElement).toHaveAttribute("allowFullScreen");
  });
});
