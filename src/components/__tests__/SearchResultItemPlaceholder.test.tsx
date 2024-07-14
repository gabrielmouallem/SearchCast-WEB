import { SearchResultItemPlaceholder } from "@/components/SearchResultItemPlaceholder"; // Adjust the path accordingly
import { makeSUT } from "@/test-utils";

describe("SearchResultItemPlaceholder Component", () => {
  it("should render the placeholder for the number of moments", () => {
    const { getByTestId } = makeSUT(
      SearchResultItemPlaceholder,
      {},
      { noWrappers: true },
    );
    const placeholder = getByTestId("placeholder-moments");

    expect(placeholder).toBeInTheDocument();
  });

  it("should render the placeholder for the thumbnail", () => {
    const { getByTestId } = makeSUT(
      SearchResultItemPlaceholder,
      {},
      { noWrappers: true },
    );
    const placeholder = getByTestId("placeholder-thumbnail");

    expect(placeholder).toBeInTheDocument();
  });

  it("should render the placeholder for the title", () => {
    const { getByTestId } = makeSUT(
      SearchResultItemPlaceholder,
      {},
      { noWrappers: true },
    );
    const placeholder = getByTestId("placeholder-title");

    expect(placeholder).toBeInTheDocument();
  });

  it("should render the placeholder for the publish date and view count", () => {
    const { getByTestId } = makeSUT(
      SearchResultItemPlaceholder,
      {},
      { noWrappers: true },
    );
    const placeholder = getByTestId("placeholder-date-view");

    expect(placeholder).toBeInTheDocument();
  });

  it("should render the placeholder for the action button", () => {
    const { getByTestId } = makeSUT(
      SearchResultItemPlaceholder,
      {},
      { noWrappers: true },
    );
    const placeholder = getByTestId("placeholder-action-button");

    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveStyle({ width: "295px", height: "50px" });
  });

  it("should have the correct container classes", () => {
    const { getByTestId } = makeSUT(
      SearchResultItemPlaceholder,
      {},
      { noWrappers: true },
    );
    const containerDiv = getByTestId("placeholder-container");

    expect(containerDiv).toHaveClass(
      "mx-auto flex !max-w-736px animate-pulse flex-col gap-4",
    );
  });
});
