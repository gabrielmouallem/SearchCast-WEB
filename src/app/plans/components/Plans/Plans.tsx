import { Navbar } from "@/components";
import { useRefreshAccessToken } from "@/hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlanCard from "../PlanCard/PlanCard";
import FreePlanCard from "../FreePlanCard/FreePlanCard";

export function Plans() {
  const { isLoading, refetch } = useRefreshAccessToken();

  return (
    <>
      <ToastContainer />
      <Navbar isAuthenticated />
      <div className="mb-20 mt-80 flex h-screen w-screen flex-col items-center justify-center gap-8 px-4 md:mb-0 md:mt-0">
        <div className="text-center text-4xl font-bold">
          Selecione um Plano:
        </div>
        <div className="text-center text-lg font-light">
          Para poder utilizar a nossa plataforma selecione um dos planos abaixo.
        </div>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
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
