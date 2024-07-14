import { Content } from "@/components/Content";
import { makeSUT } from "@/test-utils";

describe("ContentGap Component", () => {
  it("should render children with default gap", () => {
    const props = { children: <div>Test Child</div> };

    const { getByText } = makeSUT(Content.Gap, props, { noWrappers: true });
    const child = getByText("Test Child");

    expect(child).toBeInTheDocument();
    expect(child.parentElement).toHaveClass(
      "gap flex flex-col items-center self-stretch gap-0",
    );
  });

  it("should render children with custom gap and className", () => {
    const props = {
      children: <div>Test Child</div>,
      className: "custom-class",
      gap: "gap-4" as const,
    };

    const { getByText } = makeSUT(Content.Gap, props, { noWrappers: true });
    const child = getByText("Test Child");

    expect(child).toBeInTheDocument();
    expect(child.parentElement).toHaveClass(
      "gap flex flex-col items-center self-stretch gap-4 custom-class",
    );
  });
});
