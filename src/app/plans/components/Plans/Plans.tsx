"use client";
import { useRefreshAccessToken, useUser } from "@/hooks";
import { ToastContainer } from "react-toastify";
import PlanCard from "../PlanCard/PlanCard";
import FreePlanCard from "../FreePlanCard/FreePlanCard";
import "react-toastify/dist/ReactToastify.css";
import { useRequestFreePlan } from "./hooks/useRequestFreePlan";
import { useIsMounted } from "@/hooks/useIsMounted";
import { LoadingFallback } from "@/components/LoadingFallback";

export function Plans() {
  const user = useUser();
  const { isLoading, refetch } = useRefreshAccessToken();
  const { isPending, isSuccess, mutate } = useRequestFreePlan();

  const isMounted = useIsMounted();
  const showPlans = !isLoading;
  const showFreePlan = !(user?.allow_unpaid_access || user?.subscription);

  if (!isMounted)
    return <LoadingFallback height="[height:calc(100vh-300px)]" />;

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center gap-8 sm:pt-[10vh]">
        <div className="text-center text-4xl font-bold">
          Selecione um Plano:
        </div>
        <div className="text-center text-lg font-light">
          Para poder utilizar a nossa plataforma selecione um dos planos abaixo.
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-6">
          {showPlans && (
            <>
              {showFreePlan && (
                <FreePlanCard
                  isPending={isPending}
                  isSuccess={isSuccess}
                  mutate={mutate}
                />
              )}
              <PlanCard subscriptionType="month" onCancel={refetch} />
              <PlanCard subscriptionType="semester" onCancel={refetch} />
              <PlanCard subscriptionType="year" onCancel={refetch} />
            </>
          )}
          {!showPlans && (
            <>
              {showFreePlan && (
                <div className="relative h-[280px] w-[250px] animate-pulse rounded-xl border border-gray-800 bg-dark-gray" />
              )}
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
