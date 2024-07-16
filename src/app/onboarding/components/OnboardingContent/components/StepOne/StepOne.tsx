import { motion } from "framer-motion";
import { Button } from "@/components";
import Image from "next/image";

interface StepOneProps {
  handleNext: () => void;
}

export function StepOne({ handleNext }: StepOneProps) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-8 rounded-lg p-8 text-center">
        <Image src="/logo.svg" width={80} height={50} alt="SearchCast Logo" />
        <h1 className="text-3xl font-bold">Bem-vindo ao SearchCast!</h1>
        <p className="text-lg">
          O SearchCast é a plataforma ideal para encontrar os momentos mais
          relevantes dos seus podcasts favoritos. Encontre exatamente o que você
          quer ouvir em poucos cliques.
        </p>
        <Button
          onClick={handleNext}
          className="!bg-brand transition hover:brightness-75"
        >
          Começar!
        </Button>
      </div>
    </motion.div>
  );
}
