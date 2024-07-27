import React, { createContext, useContext, useState, ReactNode } from "react";
import { useCookies } from "@/hooks";
import { stringToBoolean } from "@/utils/shared";

interface SkipOnboardingContextProps {
  skipOnboarding: boolean;
  finishOnboarding: () => void;
}

const SkipOnboardingContext = createContext<
  SkipOnboardingContextProps | undefined
>(undefined);

const SkipOnboardingProvider = ({ children }: { children: ReactNode }) => {
  const { getCookie, updateCookie } = useCookies("skip_onboarding", "false");

  const [skipOnboarding, setSkipOnboarding] = useState(
    stringToBoolean(getCookie()),
  );

  const finishOnboarding = () => {
    updateCookie("true", 30);
    setSkipOnboarding(true);
  };

  return (
    <SkipOnboardingContext.Provider
      value={{ skipOnboarding, finishOnboarding }}
    >
      {children}
    </SkipOnboardingContext.Provider>
  );
};

const useSkipOnboarding = () => {
  const context = useContext(SkipOnboardingContext);
  if (!context) {
    throw new Error(
      "useSkipOnboarding must be used within a SkipOnboardingProvider",
    );
  }
  return context;
};

export { SkipOnboardingProvider, useSkipOnboarding };
