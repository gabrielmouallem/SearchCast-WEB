import { Tailwindest } from "tailwindest";

interface ContentGapProps {
  children: React.ReactNode;
  className?: string;
  gap?: Tailwindest["gap"];
}

export function ContentGap({
  children,
  className = "",
  gap = "gap-0",
}: ContentGapProps) {
  return (
    <div
      className={`flex flex-col items-center gap self-stretch ${gap} ${className}`}
    >
      {children}
    </div>
  );
}
