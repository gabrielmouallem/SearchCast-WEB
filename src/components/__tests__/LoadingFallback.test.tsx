import { LoadingFallback } from "@/components/LoadingFallback";
import { makeSUT } from "@/test-utils";

describe("LoadingFallback Component", () => {
  it("should render properly", () => {
    const { container } = makeSUT(LoadingFallback, {}, { noWrappers: true });
    const containerDiv = container.querySelector("div");

    expect(containerDiv).toHaveClass(
      "flex h-[100vh] w-full items-center justify-center",
    );

    const lottieElement = container.querySelector("svg");
    expect(lottieElement).toBeInTheDocument();
  });
});
