import { RedirectButton } from "@/components/RedirectButton"; // Adjust the path accordingly
import { makeSUT } from "@/test-utils";

describe("RedirectButton Component", () => {
  it("should render the button with correct text", () => {
    const { getByText } = makeSUT(RedirectButton, {}, { noWrappers: true });

    const newFunctionText = getByText("Nova função");
    const searchSuggestionsText = getByText("Sugestões de busca");

    expect(newFunctionText).toBeInTheDocument();
    expect(searchSuggestionsText).toBeInTheDocument();
  });

  it("should render the dot image with motion", () => {
    const { getByAltText } = makeSUT(RedirectButton, {}, { noWrappers: true });

    const dotImage = getByAltText("Ponto");
    expect(dotImage).toBeInTheDocument();
    expect(dotImage).toHaveAttribute("src", "/dot_icon.svg");
  });

  it("should render the arrow image", () => {
    const { getByAltText } = makeSUT(RedirectButton, {}, { noWrappers: true });

    const arrowImage = getByAltText("Seta para direita");
    expect(arrowImage).toBeInTheDocument();
    expect(arrowImage).toHaveAttribute("src", "/arrow_right_icon.svg");
  });

  it("should have correct link href", () => {
    const { container } = makeSUT(RedirectButton, {}, { noWrappers: true });

    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "/search");
  });

  it("should apply correct styles to the button", () => {
    const { container } = makeSUT(RedirectButton, {}, { noWrappers: true });

    const button = container.querySelector("button");
    expect(button).toHaveClass(
      "flex items-center justify-center gap-2.5 rounded-lg border border-border bg-background p-0.5 pr-2",
    );
  });

  it("should apply correct styles to the inner div elements", () => {
    const { getByText } = makeSUT(RedirectButton, {}, { noWrappers: true });

    const newFunctionDiv = getByText("Nova função").closest("div");
    expect(newFunctionDiv).toHaveClass(
      "flex h-6 items-center justify-center gap-1 rounded-md border border-border p-1.5 text-sm font-medium text-gray-300",
    );

    const searchSuggestionsDiv = getByText("Sugestões de busca").closest("div");
    expect(searchSuggestionsDiv).toHaveClass(
      "flex items-center justify-center gap-1 text-sm font-medium text-gray-300",
    );
  });
});
