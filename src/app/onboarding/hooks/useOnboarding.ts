import { useState } from "react";
import { flushSync } from "react-dom";
import { useQueryState } from "next-usequerystate";
import { useWindowScroll } from "@uidotdev/usehooks";
import { Step } from "../components/OnboardingContent/OnboardingContent.types";
import { useSkipOnboarding } from "./useSkipOnboarding";

export function useOnboarding() {
  const [, scrollTo] = useWindowScroll();
  const { finishOnboarding } = useSkipOnboarding();
  const [stringStep] = useQueryState("initialStep", {
    defaultValue: "1",
  });
  const [step, setStep] = useState<Step>(
    (["1", "2", "3", "4"].includes(stringStep)
      ? Number(stringStep)
      : 1) as Step,
  );

  const [mockedText, setMockedText] = useState("");

  const showBackButton = [2, 3].includes(step) && stringStep !== "3";

  const handleSteps = (step: Step) => {
    if (step === 3) {
      finishOnboarding();
    }
  };

  const handlePrevious = () => {
    flushSync(() => {
      setStep((prevStep) => Math.max(1, prevStep - 1) as Step);
    });
    handleSteps(step);
    scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    flushSync(() => {
      setStep((prevStep) => Math.min(4, prevStep + 1) as Step);
    });
    handleSteps(step);
    scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  const handleSearch = (keyword: string) => {
    flushSync(() => {
      setMockedText(keyword);
    });
    handleNext();
  };

  const getStepOneProps = () => ({
    handleNext,
  });

  const getStepTwoProps = () => ({
    handleNext,
  });

  const getStepThreeProps = () => ({ handleSearch });

  const getStepFourProps = () => ({ mockedText });

  const getBackButtonProps = () => ({
    show: showBackButton,
    onClick: handlePrevious,
  });

  return {
    step,
    getStepOneProps,
    getStepTwoProps,
    getStepThreeProps,
    getStepFourProps,
    getBackButtonProps,
  };
}
