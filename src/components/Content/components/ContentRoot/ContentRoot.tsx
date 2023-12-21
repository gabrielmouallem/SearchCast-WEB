interface ContentRootProps {
  children: React.ReactNode;
}

export function ContentRoot({ children }: ContentRootProps) {
  return (
    <div className="flex flex-col items-center gap-16 self-stretch pt-24">
      {children}
    </div>
  );
}
