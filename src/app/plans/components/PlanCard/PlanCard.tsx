"use client";
import React, { useMemo } from "react";
import { Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import api from "@/services/ApiService/ApiService";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components";
import { toast } from "react-toastify";

const subscriptionSwitchCase: Record<
  SubscriptionType,
  { text: string; value: string; discount: string; recurrency: string }
> = {
  month: {
    text: "Mensal",
    value: "R$20",
    recurrency: "por mês",
    discount: "0% de desconto.",
  },
  semester: {
    text: "Semestral",
    value: "R$110",
    recurrency: "por semestre",
    discount: "~10% de desconto.",
  },
  year: {
    text: "Anual",
    value: "R$190",
    recurrency: "por ano",
    discount: "~20% de desconto.",
  },
};

type SubscriptionType = "month" | "semester" | "year";

interface PlanCardProps {
  subscriptionType: SubscriptionType;
  onCancel: () => void;
}

const PlanCard = ({ subscriptionType, onCancel }: PlanCardProps) => {
  const { getUser } = useAuth();
  const user = useMemo(() => getUser(), [getUser]);

  const currentPeriodEnd = user?.subscription?.current_period_end ?? 0;
  const currentUnixTimestamp = Math.floor(Date.now() / 1000);
  const hasNotExpired = currentPeriodEnd > currentUnixTimestamp;
  const isActive =
    user?.subscription?.plan === subscriptionType && hasNotExpired;

  const isCancellationPending = isActive && !!user?.subscription?.cancel_at;
  const isExpirationPending = isActive && !isCancellationPending;

  const cancellsAt = new Date((user?.subscription?.cancel_at ?? 0) * 1000);
  const expiresAt = new Date(
    (user?.subscription?.current_period_end ?? 0) * 1000
  );

  const disabled = !isActive && !!user?.subscription && hasNotExpired;
  const buttonDisabled =
    ((!isActive && !!user?.subscription) || isCancellationPending) &&
    hasNotExpired;

  const handlePaymentCancellation = async () => {
    try {
      await api.post("/cancel", {
        customer_email: user?.email,
      });
      setTimeout(() => {
        onCancel();
      }, 1000);
      toast.info("Plano cancelado com sucesso!", {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch {
      toast.error("Erro ao cancelar plano. Por favor tente novamente!", {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handlePayment = async () => {
    const { data } = await api.post("/checkout", {
      subscription_type: subscriptionType,
      customer_email: user?.email,
    });
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );

    const stripe = await stripePromise;
    const result = await (stripe as Stripe).redirectToCheckout({
      sessionId: data.sessionId,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div
      className={`relative w-[250px] h-[280px] p-5 flex items-center justify-start flex-col gap-3 bg-dark-gray border border-gray-800 rounded-xl ${
        disabled ? "opacity-50" : ""
      }`}
    >
      {isActive && (
        <div className="w-[100px] h-[20px] absolute p-2 rounded bg-green-600 top-[-10px] left-[80px] text-sm flex text-center justify-center items-center">
          Plano Atual
        </div>
      )}
      <div className="font-bold text-4xl">
        {subscriptionSwitchCase[subscriptionType].text}
      </div>
      <div className="w-full h-[1px] bg-gray-800" />
      <span>
        <span className="font-bold text-4xl">
          {subscriptionSwitchCase[subscriptionType].value}
        </span>
        <span className="font-light text-sm">
          {" "}
          {subscriptionSwitchCase[subscriptionType].recurrency}
        </span>
      </span>
      {!!(subscriptionType !== "month") && (
        <span className="font-light text-green-600 text-sm">
          {subscriptionSwitchCase[subscriptionType].discount}
        </span>
      )}
      {!(subscriptionType !== "month") && (
        <span className="font-ligh text-sm text-gray-400">
          Não há descontos.
        </span>
      )}
      {isExpirationPending && (
        <span className="font-light text-red-500 text-xs">
          Renova em: {expiresAt.toLocaleDateString()}
        </span>
      )}
      {isCancellationPending && (
        <span className="font-light text-red-500 text-xs">
          Encerra em: {cancellsAt.toLocaleDateString()}
        </span>
      )}
      <Button
        className={`font-bold ${
          isActive
            ? isCancellationPending
              ? "!bg-brand"
              : isExpirationPending
              ? "!bg-red-800"
              : ""
            : "!bg-brand"
        }`}
        disabled={buttonDisabled}
        onClick={
          isActive
            ? isCancellationPending
              ? handlePayment
              : isExpirationPending
              ? handlePaymentCancellation // You can replace this with the appropriate handler for expiration if needed
              : handlePayment
            : handlePayment
        }
      >
        {isActive
          ? isCancellationPending
            ? "ASSINAR"
            : isExpirationPending
            ? "CANCELAR"
            : "ASSINAR"
          : "ASSINAR"}
      </Button>
    </div>
  );
};

export default PlanCard;
