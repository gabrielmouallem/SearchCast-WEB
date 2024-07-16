import { ONBOARDING_STEPS } from "./OnboardingContent.constants";

export type Step = keyof typeof ONBOARDING_STEPS;

export interface WelcomeStepProps {
  onNext: () => void;
}

export interface UserIdentificationStepProps {
  onNext: () => void;
}

export interface FreeSearchStepProps {
  onSearch: (keyword: string) => void;
}
