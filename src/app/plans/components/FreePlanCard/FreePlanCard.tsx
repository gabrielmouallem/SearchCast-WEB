import React from "react";
import { Button } from "@/components";
import { UseMutateFunction } from "@tanstack/react-query";

interface FreePlanCardProps {
  isSuccess: boolean;
  isPending: boolean;
  mutate: UseMutateFunction;
}

const FreePlanCard = ({ isSuccess, isPending, mutate }: FreePlanCardProps) => {
  return (
    <div
      className={`relative flex h-[280px] w-[250px] flex-col items-center justify-start gap-3 rounded-xl border border-gray-800 bg-dark-gray p-5`}
    >
      <div className="absolute left-[80px] top-[-10px] flex h-[20px] w-[100px] items-center justify-center rounded bg-yellow-400 p-2 text-center text-sm text-black">
        Exclusivo!!
      </div>
      <div className="text-4xl font-bold">Grátis</div>
      <div className="h-[1px] w-full bg-gray-800" />
      <span>
        <span className="text-4xl font-bold">R$0</span>
        <span className="text-sm font-light">por mês</span>
      </span>
      <span className="text-sm font-light text-yellow-400">
        Por tempo limitado
      </span>
      <Button
        className={`!bg-brand font-bold ${isPending ? "opacity-50" : ""}`}
        disabled={isPending || isSuccess}
        onClick={() => mutate()}
      >
        {isSuccess ? "SOLICITADO" : isPending ? "SOLICITANDO..." : "SOLICITAR"}
      </Button>
    </div>
  );
};

export default FreePlanCard;
