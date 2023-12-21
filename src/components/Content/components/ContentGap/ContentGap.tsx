import { Tailwindest } from "tailwindest";

interface ContentGapProps {
  children: React.ReactNode;
  gap?: Tailwindest["gap"];
}

export function ContentGap({ children, gap = "gap-0" }: ContentGapProps) {
  return (
    <div className={`flex flex-col items-center gap self-stretch ${gap}`}>
      {children}
    </div>
  );
}
