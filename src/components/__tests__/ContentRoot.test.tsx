import { Content } from "@/components/Content";
import { makeSUT } from "@/test-utils";

describe("ContentRoot Component", () => {
  it("should render children", () => {
    const props = { children: <div>Test Child</div> };

    const { getByText } = makeSUT(Content.Root, props, {
      noWrappers: true,
    });
    const child = getByText("Test Child");

    expect(child).toBeInTheDocument();
    expect(child.parentElement).toHaveClass(
      "flex flex-col items-center self-stretch pt-24",
    );
  });
});
