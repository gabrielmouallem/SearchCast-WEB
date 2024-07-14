import { Content } from "@/components/Content";
import { makeSUT } from "@/test-utils";

describe("ContentSection Component", () => {
  it("should render children", () => {
    const props = { children: <div>Test Child</div> };

    const { getByText } = makeSUT(Content.Section, props, {
      noWrappers: true,
    });
    const child = getByText("Test Child");

    expect(child).toBeInTheDocument();
    expect(child.parentElement).toHaveClass("self-stretch");
  });
});
