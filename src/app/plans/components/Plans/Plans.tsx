"use client";
import { useRefreshAccessToken } from "@/hooks";
import { ToastContainer } from "react-toastify";
import PlanCard from "../PlanCard/PlanCard";
import FreePlanCard from "../FreePlanCard/FreePlanCard";
import "react-toastify/dist/ReactToastify.css";

export function Plans() {
  const { isLoading, refetch } = useRefreshAccessToken();

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center gap-8 pt-[10vh]">
        <div className="text-center text-4xl font-bold">
          Selecione um Plano:
        </div>
        <div className="text-center text-lg font-light">
          Para poder utilizar a nossa plataforma selecione um dos planos abaixo.
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-6">
          {!isLoading && (
            <>
              <FreePlanCard />
              <PlanCard subscriptionType="month" onCancel={refetch} />
              <PlanCard subscriptionType="semester" onCancel={refetch} />
              <PlanCard subscriptionType="year" onCancel={refetch} />
            </>
          )}
          {isLoading && (
            <>
              <div className="relative h-[280px] w-[250px] animate-pulse rounded-xl border border-gray-800 bg-dark-gray" />
              <div className="relative h-[280px] w-[250px] animate-pulse rounded-xl border border-gray-800 bg-dark-gray" />
              <div className="relative h-[280px] w-[250px] animate-pulse rounded-xl border border-gray-800 bg-dark-gray" />
              <div className="relative h-[280px] w-[250px] animate-pulse rounded-xl border border-gray-800 bg-dark-gray" />
            </>
          )}
        </div>
      </div>
    </>
  );
}
