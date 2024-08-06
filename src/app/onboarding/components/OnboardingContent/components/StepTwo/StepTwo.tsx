import { AnimatePresence, motion } from "framer-motion";
import { ONBOARDING_OPTIONS } from "../../OnboardingContent.constants";
import { Button } from "@/components";
import Image from "next/image";
import posthog from "posthog-js";
import { useUser } from "@/hooks";

interface StepTwoProps {
  handleNext: () => void;
}

export function StepTwo({ handleNext }: StepTwoProps) {
  const user = useUser();

  return (
    <motion.div
      key="userIdentification"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-8 rounded-lg p-8 text-center">
        <Image src="/logo.svg" width={80} height={50} alt="SearchCast Logo" />
        <h2 className="text-3xl font-bold">Queremos saber mais sobre você</h2>
        <p className="text-lg font-extralight opacity-95">
          Escolha uma opção que melhor descreve você:
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
          <AnimatePresence>
            {ONBOARDING_OPTIONS.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  className="transition hover:brightness-150"
                  onClick={() => {
                    posthog.capture(
                      "onboarding",
                      {
                        user,
                        option,
                      },
                      {
                        send_instantly: true,
                      },
                    );
                    handleNext();
                  }}
                >
                  {option}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
