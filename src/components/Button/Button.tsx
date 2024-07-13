import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  as?: "button";
  startIcon?: React.ReactNode;
}

interface LinkProps extends ComponentProps<"a"> {
  as: "a";
  startIcon?: React.ReactNode;
}

export function Button({
  startIcon,
  as = "button",
  children,
  ...props
}: ButtonProps | LinkProps) {
  const className = props?.className ?? "";
  const Component = as;

  return (
    <Component
      {...(props as any)}
      className={`text-primary flex items-center justify-center rounded-lg border border-border bg-dark-gray px-5 py-3 text-center ${className} ${
        (props as any)?.disabled ? "opacity-50" : ""
      }`}
    >
      {!!startIcon && startIcon}
      {children}
    </Component>
  );
}
