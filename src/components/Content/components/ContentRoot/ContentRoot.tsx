interface ContentRootProps {
  children: React.ReactNode;
}

export function ContentRoot({ children }: ContentRootProps) {
  return (
    <div
      data-testid="ContentRoot"
      className="flex flex-col items-center self-stretch pt-24"
    >
      {children}
    </div>
  );
}
