import { Card } from "@/components/Card";
import { makeSUT } from "@/test-utils";

describe("Card Component", () => {
  it("should render the icon", () => {
    const props = {
      iconSrc: "/chat_icon.svg",
      title: "Card Title",
      description: "This is a card description.",
    };

    const { getByAltText } = makeSUT(Card, props, { noWrappers: true });
    const icon = getByAltText("Card Icon");

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", props.iconSrc);
  });

  it("should render the title", () => {
    const props = {
      iconSrc: "/chat_icon.svg",
      title: "Card Title",
      description: "This is a card description.",
    };

    const { getByText } = makeSUT(Card, props, { noWrappers: true });
    const title = getByText(props.title);

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("text-xl font-semibold leading-7");
  });

  it("should render the description", () => {
    const props = {
      iconSrc: "/chat_icon.svg",
      title: "Card Title",
      description: "This is a card description.",
    };

    const { getByText } = makeSUT(Card, props, { noWrappers: true });
    const description = getByText(props.description);

    expect(description).toBeInTheDocument();
    expect(description).toHaveClass(
      "text-base font-normal leading-6 text-text-secondary",
    );
  });
});
