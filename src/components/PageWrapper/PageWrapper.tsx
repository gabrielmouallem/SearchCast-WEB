import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div
      className={`pb-10 [min-height:calc(100vh-280px)] md:[min-height:calc(100vh-207px)]`}
    >
      {children}
    </div>
  );
}
