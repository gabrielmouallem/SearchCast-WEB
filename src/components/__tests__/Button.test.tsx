import { screen } from "@testing-library/react";
import { Button } from "@/components/Button";
import { makeSUT } from "@/test-utils";

describe("Button component", () => {
  test("renders as a button element by default", () => {
    makeSUT(Button, { children: "Click Me" }, { noWrappers: true });
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      "text-primary flex items-center justify-center rounded-lg border border-border bg-dark-gray px-5 py-3 text-center",
    );
  });

  test('renders as an anchor element when "as" prop is "a"', () => {
    makeSUT(
      Button,
      { as: "a", href: "#", children: "Click Me" },
      { noWrappers: true },
    );
    const linkElement = screen.getByRole("link", { name: /click me/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "#");
    expect(linkElement).toHaveClass(
      "text-primary flex items-center justify-center rounded-lg border border-border bg-dark-gray px-5 py-3 text-center",
    );
  });

  test("renders with a start icon", () => {
    makeSUT(
      Button,
      { startIcon: <span>Icon</span>, children: "Click Me" },
      { noWrappers: true },
    );
    const iconElement = screen.getByText(/icon/i);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(iconElement).toBeInTheDocument();
    expect(buttonElement).toContainElement(iconElement);
  });

  test("renders with additional class names", () => {
    makeSUT(
      Button,
      { className: "extra-class", children: "Click Me" },
      { noWrappers: true },
    );
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toHaveClass("extra-class");
  });

  test("renders with disabled state", () => {
    makeSUT(
      Button,
      { disabled: true, children: "Click Me" },
      { noWrappers: true },
    );
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass("opacity-50");
  });
});
