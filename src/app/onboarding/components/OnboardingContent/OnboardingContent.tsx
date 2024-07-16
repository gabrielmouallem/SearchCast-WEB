import { Button } from "@/components";
import { AnimatePresence } from "framer-motion";
import { useOnboarding } from "../../hooks/useOnboarding";
import { StepOne } from "./components/StepOne";
import { StepTwo } from "./components/StepTwo/StepTwo";
import { StepThree } from "./components/StepThree";
import { StepFour } from "./components/StepFour";
import { BackButton } from "./components/BackButton";

export function OnboardingContent() {
  const {
    step,
    getStepOneProps,
    getStepTwoProps,
    getStepThreeProps,
    getStepFourProps,
    getBackButtonProps,
  } = useOnboarding();

  return (
    <div className="bg-foggy-gradient relative flex min-h-screen flex-col justify-center p-4 py-20 text-text-primary">
      <AnimatePresence mode="wait">
        <>
          {step === 1 && <StepOne {...getStepOneProps()} />}
          {step === 2 && <StepTwo {...getStepTwoProps()} />}
          {step === 3 && <StepThree {...getStepThreeProps()} />}
          {step === 4 && <StepFour {...getStepFourProps()} />}

          <BackButton {...getBackButtonProps()} />

          <div className="fixed bottom-4 left-0 right-0 z-50 mb-10 flex w-full items-center justify-center px-14">
            {step === 4 && (
              <Button
                as="a"
                href="/plans"
                className="mx-auto scale-150 !bg-brand shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition hover:brightness-75"
              >
                Consultar Planos
              </Button>
            )}
          </div>
        </>
      </AnimatePresence>
    </div>
  );
}
