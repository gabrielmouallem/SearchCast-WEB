import { Footer } from "@/components/Footer"; // Adjust the path accordingly
import { makeSUT } from "@/test-utils";

describe("Footer Component", () => {
  it("should render the logo image", () => {
    const { getByAltText } = makeSUT(Footer, {}, { noWrappers: true });
    const logoImage = getByAltText("SearchCast Logo");

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "/logo_w_name.svg");
  });

  it("should render the copyright text", () => {
    const { getByText } = makeSUT(Footer, {}, { noWrappers: true });
    const copyrightText = getByText(
      "© 2024 SearchCast. Todos os direitos reservados",
    );

    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText).toHaveClass(
      "text-base font-normal leading-6 text-text-secondary md:ml-auto",
    );
  });

  it("should apply correct styles to the footer", () => {
    const { container } = makeSUT(Footer, {}, { noWrappers: true });
    const footer = container.querySelector("footer");

    expect(footer).toHaveClass(
      "flex flex-col items-center gap-4 border-t border-gray-800 bg-background py-12 text-center md:mx-16 md:mb-5 md:flex-row md:py-8 md:text-start",
    );
  });
});
