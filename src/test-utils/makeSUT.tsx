import React, { ReactNode } from "react";
import { render, RenderResult } from "@testing-library/react";
import { Providers } from "@/components/Providers";

type Options = {
  noWrappers?: boolean;
  override?: {
    wrapper?: ({ children }: { children: ReactNode }) => JSX.Element;
  };
};

type ComponentProps<P> = P & React.JSX.IntrinsicAttributes;

export const makeSUT = <P,>(
  Component: React.ComponentType<P>,
  props: ComponentProps<P>,
  options?: Options,
): RenderResult => {
  const Wrapper = options?.noWrappers
    ? React.Fragment
    : options?.override?.wrapper || Providers;

  return render(<Component {...props} />, {
    wrapper: ({ children }) => <Wrapper>{children}</Wrapper>,
  });
};
