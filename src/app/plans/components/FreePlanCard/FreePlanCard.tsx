"use client";
import React from "react";
import { Button } from "@/components";
import { useUser } from "@/hooks";
import { toast } from "react-toastify";
import posthog from "posthog-js";
import { useLocalStorage } from "@uidotdev/usehooks";

const FreePlanCard = () => {
  const user = useUser();
  const [requestedId, setRequestedId] =
    useLocalStorage<string>("trial_requested");

  const handleRequest = () => {
    posthog.capture("trial_requested", user);
    toast(
      "Solicitação recebida com sucesso. O processamento pode levar até 24 horas.",
      {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        type: "success",
      },
    );
    setRequestedId(user?._id as string);
  };

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
        className={`!bg-brand font-bold ${requestedId === user?._id ? "opacity-50" : ""}`}
        onClick={handleRequest}
        disabled={requestedId === user?._id}
      >
        {requestedId === user?._id ? "SOLICITADO" : "SOLICITAR"}
      </Button>
    </div>
  );
};

export default FreePlanCard;
