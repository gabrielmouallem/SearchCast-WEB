type InputProps = React.ComponentProps<"input">;

export function Input({ ...props }: InputProps) {
  const className = props?.className ?? "";
  return (
    <input
      {...props}
      className={`shadow-xs text-16 leading-24 overflow-hidden text-ellipsis rounded-md border border-solid border-border bg-background px-4 py-2 text-base font-light ${className}`}
    />
  );
}
