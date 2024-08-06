interface ContentRootProps {
  children: React.ReactNode;
}

export function ContentRoot({ children }: ContentRootProps) {
  return (
    <div className="relative flex flex-col items-center self-stretch">
      {children}
    </div>
  );
}
