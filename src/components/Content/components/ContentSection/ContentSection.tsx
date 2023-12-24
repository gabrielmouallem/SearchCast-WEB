interface ContentSectionProps {
  children: React.ReactNode;
}

export function ContentSection({ children }: ContentSectionProps) {
  return <div className="self-stretch">{children}</div>;
}
