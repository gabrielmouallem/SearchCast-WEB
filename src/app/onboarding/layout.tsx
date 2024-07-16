"use client";
import { SkipOnboardingProvider } from "./hooks/useSkipOnboarding";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SkipOnboardingProvider>{children}</SkipOnboardingProvider>;
}
