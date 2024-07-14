import { makeSUT } from "@/test-utils";
import { Avatar } from "@/components/Avatar";

describe("Avatar Component", () => {
  const defaultProps = {
    name: "John Doe",
  };

  it("should render the Avatar with default size", () => {
    const { getByRole } = makeSUT(Avatar, defaultProps, { noWrappers: true });
    const button = getByRole("button");

    expect(button).toHaveTextContent("JD");
    expect(button).toHaveClass("h-[40px]");
    expect(button).toHaveClass("w-[40px]");
    expect(button).toHaveClass("bg-gray-500");
  });

  it("should render the Avatar with large size", () => {
    const { getByRole } = makeSUT(
      Avatar,
      { ...defaultProps, size: "large" },
      { noWrappers: true },
    );
    const button = getByRole("button");

    expect(button).toHaveTextContent("JD");
    expect(button).toHaveClass("pointer-events-none m-5 scale-[2]");
  });

  it("should render only the first letter if the name contains a single word", () => {
    const { getByRole } = makeSUT(
      Avatar,
      { name: "John" },
      { noWrappers: true },
    );
    const button = getByRole("button");

    expect(button).toHaveTextContent("J");
  });

  it("should handle an empty name", () => {
    const { getByRole } = makeSUT(Avatar, { name: "" }, { noWrappers: true });
    const button = getByRole("button");

    expect(button).toBeEmptyDOMElement();
  });

  it("should handle a name with multiple spaces", () => {
    const { getByRole } = makeSUT(
      Avatar,
      { name: "John Doe" },
      { noWrappers: true },
    );
    const button = getByRole("button");

    expect(button).toHaveTextContent("JD");
  });
});
