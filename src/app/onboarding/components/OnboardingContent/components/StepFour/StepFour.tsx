import { motion } from "framer-motion";
import { SearchEngine } from "@/components";

interface StepFourProps {
  mockedText: string;
}

export function StepFour({ mockedText }: StepFourProps) {
  return (
    <motion.div
      key="freeSearch"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SearchEngine options={{ mockedText }} />
    </motion.div>
  );
}
