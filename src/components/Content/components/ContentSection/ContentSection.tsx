interface ContentSectionProps {
  children: React.ReactNode;
}

export function ContentSection({ children }: ContentSectionProps) {
  return <div className="relative self-stretch">{children}</div>;
}
