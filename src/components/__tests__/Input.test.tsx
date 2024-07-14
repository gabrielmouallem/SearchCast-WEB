import { Input } from "@/components/Input"; // Adjust the path accordingly
import { makeSUT } from "@/test-utils";

describe("Input Component", () => {
  it("should render with default classes", () => {
    const props = { placeholder: "Enter text" };
    const { getByPlaceholderText } = makeSUT(Input, props, {
      noWrappers: true,
    });
    const inputElement = getByPlaceholderText("Enter text");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(
      "shadow-xs text-16 leading-24 overflow-hidden text-ellipsis rounded-md border border-solid border-border bg-background px-4 py-2 text-base font-light",
    );
  });

  it("should accept and apply additional class names", () => {
    const props = { className: "custom-class", placeholder: "Enter text" };
    const { getByPlaceholderText } = makeSUT(Input, props, {
      noWrappers: true,
    });
    const inputElement = getByPlaceholderText("Enter text");

    expect(inputElement).toHaveClass("custom-class");
  });

  it("should accept and apply other props", () => {
    const props = {
      placeholder: "Enter text",
      value: "Test Value",
      type: "text",
    };
    const { getByDisplayValue } = makeSUT(Input, props, { noWrappers: true });
    const inputElement = getByDisplayValue("Test Value");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
  });
});
