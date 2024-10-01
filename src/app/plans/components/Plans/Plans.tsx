"use client";
import { useRefreshUser, useUser } from "@/hooks";
import { ToastContainer } from "react-toastify";
import PlanCard from "../PlanCard/PlanCard";
import FreePlanCard from "../FreePlanCard/FreePlanCard";
import "react-toastify/dist/ReactToastify.css";
import { useRequestFreePlan } from "./hooks/useRequestFreePlan";
import { useIsMounted } from "@/hooks/useIsMounted";
import { LoadingFallback } from "@/components/LoadingFallback";
import { useGetActiveSubscription } from "../PlanCard/hooks/useGetActiveSubscription";

export function Plans() {
  const user = useUser();
  const { isLoading: isLoadingRefreshedUser, refetch } = useRefreshUser();
  const {
    isPending: isPendingRequestFreePlan,
    isSuccess: isSuccessRequestFreePlan,
    mutate: mutateFreePlan,
  } = useRequestFreePlan();
  const { data: activeSubscription, isPending: isPendingActiveSubscription } =
    useGetActiveSubscription();

  const isMounted = useIsMounted();
  const showPlans = !isLoadingRefreshedUser && !isPendingActiveSubscription;
  const showFreePlan = !(
    user?.user_metadata?.allow_unpaid_access ||
    user?.user_metadata?.subscription
  );

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
                  isPending={isPendingRequestFreePlan}
                  isSuccess={isSuccessRequestFreePlan}
                  mutate={mutateFreePlan}
                />
              )}
              <PlanCard
                subscriptionType="month"
                onCancel={refetch}
                activeSubscription={activeSubscription as any}
              />
              <PlanCard
                subscriptionType="semester"
                onCancel={refetch}
                activeSubscription={activeSubscription as any}
              />
              <PlanCard
                subscriptionType="year"
                onCancel={refetch}
                activeSubscription={activeSubscription as any}
              />
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
