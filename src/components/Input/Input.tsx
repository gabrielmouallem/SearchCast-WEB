type InputProps = React.ComponentProps<"input">;

export function Input({ ...props }: InputProps) {
  const className = props?.className ?? "";
  return (
    <input
      {...props}
      className={`rounded-md border border-solid border-border bg-background shadow-xs py-2 px-4 overflow-hidden  font-light text-base text-ellipsis text-16 leading-24 ${className}`}
    />
  );
}
