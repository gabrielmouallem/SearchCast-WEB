interface ContentSectionProps {
  children: React.ReactNode;
  defaultPadding?: boolean;
}

export function ContentSection({
  children,
  defaultPadding,
}: ContentSectionProps) {
  return (
    <div className={`relative self-stretch ${defaultPadding ? "px-4" : ""}`}>
      {children}
    </div>
  );
}
