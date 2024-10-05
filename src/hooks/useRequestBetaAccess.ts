import { NextJsApiService } from "@/services/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useRequestBetaAccess() {
  return useMutation({
    mutationFn: () => NextJsApiService.post("/api/join-beta"),
    onSuccess: () => {
      toast(
        "Solicitação recebida com sucesso. O processamento pode levar até 24 horas.",
        {
          position: "top-center",
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
        position: "top-center",
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
