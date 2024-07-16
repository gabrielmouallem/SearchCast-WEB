import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components";
import { ONBOARDING_SEARCH_OPTIONS } from "../../OnboardingContent.constants";
import { shuffleArray } from "@/utils";
import { useMemo } from "react";

interface StepThreeProps {
  handleSearch: (keyword: string) => void;
}

export function StepThree({ handleSearch }: StepThreeProps) {
  const shuffledSearchOptions = useMemo(() => {
    const shuffled = shuffleArray(Object.entries(ONBOARDING_SEARCH_OPTIONS));
    return shuffled.map(([category, options]) => ({
      category,
      options: shuffleArray(options),
    }));
  }, []);

  return (
    <motion.div
      key="freeSearch"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-8 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold">Faça sua pesquisa!</h2>
        <p className="text-lg">
          Aqui está sua chance de testar nossa plataforma. Faça uma pesquisa
          selecionando uma das palavras-chave sugeridas.
        </p>
        {shuffledSearchOptions.map(({ category, options }, index) => {
          return (
            <div key={index} className="max-w-xl space-y-8">
              <h3 className="text-2xl font-semibold">{category}</h3>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <AnimatePresence>
                  {options.map((option, idx) => (
                    <motion.div
                      key={option}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Button
                        className="transition hover:brightness-150"
                        onClick={() => handleSearch(option)}
                      >
                        {option}
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
