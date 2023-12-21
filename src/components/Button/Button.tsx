import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  startIcon?: React.ReactNode;
}

export function Button({
  startIcon,
  children,
  ...htmlButtonpProps
}: ButtonProps) {
  const className = htmlButtonpProps?.className ?? "";

  return (
    <button
      {...htmlButtonpProps}
      className={`px-5 py-3 bg-dark-gray text-primary rounded-lg border border-border flex items-center ${className}`}
    >
      {!!startIcon && startIcon}
      {children}
    </button>
  );
}
