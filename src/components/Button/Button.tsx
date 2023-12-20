import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  overrideDefaultProps?: boolean;
  startIcon?: React.ReactNode;
}

export function Button({
  overrideDefaultProps,
  startIcon,
  children,
  ...htmlButtonpProps
}: ButtonProps) {
  const toOverrideProps = overrideDefaultProps ? htmlButtonpProps : {};

  const hasNotOverrideDefaultProps = !overrideDefaultProps;
  const hasHtmlButtonProps = !!htmlButtonpProps;
  const willNotOverrideDefaultProps =
    hasNotOverrideDefaultProps && hasHtmlButtonProps;

  const toNotOverrideProps = willNotOverrideDefaultProps
    ? htmlButtonpProps
    : {};

  return (
    <button
      {...toNotOverrideProps}
      className="px-4 py-2 bg-dark-gray text-primary rounded-lg border border-border flex items-center mr-8"
      {...toOverrideProps}
    >
      {!!startIcon && startIcon}
      {children}
    </button>
  );
}
