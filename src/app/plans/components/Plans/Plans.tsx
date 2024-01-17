import { Navbar } from "@/components";
import { useCookies } from "@/hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/ApiService/ApiService";
import PlanCard from "../PlanCard/PlanCard";

export function Plans() {
  const { updateCookie } = useCookies("access_token", "");

  const fetchAccessToken = async () => {
    const { data } = await api.get<{ access_token: string }>("/v1/refresh");
    console.log({ data });
    updateCookie(data.access_token, 1);
  };

  const { isLoading } = useQuery({
    queryKey: ["refreshToken"],
    queryFn: fetchAccessToken,
    refetchOnMount: false,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <ToastContainer />
      <Navbar isAuthenticated />
      <div className="w-screen h-screen flex flex-col mt-40 mb-20 md:mb-0 md:mt-0 gap-8 items-center justify-center px-4">
        <div className="text-4xl font-bold text-center">
          Selecione um Plano:
        </div>
        <div className="font-light text-lg text-center">
          Para poder utilizar a nossa plataforma selecione um dos planos abaixo.
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          {!isLoading && (
            <>
              <PlanCard subscriptionType="month" />
              <PlanCard subscriptionType="semester" />
              <PlanCard subscriptionType="year" />
            </>
          )}
          {isLoading && (
            <>
              <div className="animate-pulse relative w-[250px] h-[280px] bg-dark-gray border border-gray-800 rounded-xl" />
              <div className="animate-pulse relative w-[250px] h-[280px] bg-dark-gray border border-gray-800 rounded-xl" />
              <div className="animate-pulse relative w-[250px] h-[280px] bg-dark-gray border border-gray-800 rounded-xl" />
            </>
          )}
        </div>
      </div>
    </>
  );
}
