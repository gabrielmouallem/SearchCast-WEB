import { sendAccessRequest } from "@/utils/server";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useRequestFreePlan() {
  return useMutation({
    mutationFn: sendAccessRequest,
    onSuccess: () => {
      toast(
        "Solicitação recebida com sucesso. O processamento pode levar até 24 horas.",
        {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          type: "success",
        },
      );
    },
    onError: () => {
      toast("Erro. Por favor tente novamente.", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        type: "error",
      });
    },
  });
}
