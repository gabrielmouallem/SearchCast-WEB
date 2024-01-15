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
      className={`px-5 py-3 bg-dark-gray text-primary text-center rounded-lg border border-border flex items-center justify-center ${className} ${
        (props as any)?.disabled ? "opacity-50" : ""
      }`}
    >
      {!!startIcon && startIcon}
      {children}
    </Component>
  );
}
