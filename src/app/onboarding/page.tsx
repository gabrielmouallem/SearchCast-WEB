"use client";
import { Providers } from "@/components/Providers";
import { OnboardingContent } from "./components/OnboardingContent";
import { useIdentifyUser } from "@/hooks";
import { Navbar } from "@/components";
import { useSkipOnboarding } from "./hooks/useSkipOnboarding";
import { useQueryState } from "next-usequerystate";

const useIsRestrictedMode = () => {
  const [initialStep] = useQueryState("initialStep", {
    defaultValue: "1",
  });
  useIdentifyUser();

  const { skipOnboarding } = useSkipOnboarding();

  const isRestrictedMode = !skipOnboarding && initialStep !== "3";

  return isRestrictedMode;
};

export default function Onboarding() {
  const isRestrictedMode = useIsRestrictedMode();

  return (
    <Providers>
      <Navbar isAuthenticated restrictedMode={isRestrictedMode} />
      <OnboardingContent />
    </Providers>
  );
}
