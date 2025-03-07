"use client";
import React from "react";
import { loadStripe, Stripe as StripeInstance } from "@stripe/stripe-js";
import Stripe from "stripe";
import { NextJsApiService } from "@/services/client";
import { Button } from "@/components";
import { toast } from "react-toastify";
import { useUser } from "@/hooks";

const subscriptionSwitchCase: Record<
  SubscriptionType,
  { text: string; value: string; discount: string; recurrency: string }
> = {
  month: {
    text: "Mensal",
    value: "R$10",
    recurrency: "por mês",
    discount: "0% de desconto.",
  },
  semester: {
    text: "Semestral",
    value: "R$54",
    recurrency: "por semestre",
    discount: "~10% de desconto.",
  },
  year: {
    text: "Anual",
    value: "R$96",
    recurrency: "por ano",
    discount: "~20% de desconto.",
  },
};

type SubscriptionType = "month" | "semester" | "year";

interface PlanCardProps {
  subscriptionType: SubscriptionType;
  onCancel: () => void;
  activeSubscription: (Stripe.Subscription & { plan: SubscriptionType }) | null;
}

const PlanCard = ({
  subscriptionType,
  onCancel,
  activeSubscription,
}: PlanCardProps) => {
  const user = useUser();

  const currentPeriodEnd = activeSubscription?.current_period_end ?? 0;
  const currentUnixTimestamp = Math.floor(Date.now() / 1000);
  const hasNotExpired = currentPeriodEnd > currentUnixTimestamp;
  const isActive =
    activeSubscription?.plan === subscriptionType && hasNotExpired;

  const isCancellationPending = isActive && !!activeSubscription?.cancel_at;
  const isExpirationPending = isActive && !isCancellationPending;

  const cancellsAt = new Date((activeSubscription?.cancel_at ?? 0) * 1000);
  const expiresAt = new Date(
    (activeSubscription?.current_period_end ?? 0) * 1000,
  );

  const disabled = !isActive && !!activeSubscription && hasNotExpired;
  const buttonDisabled =
    ((!isActive && !!activeSubscription) || isCancellationPending) &&
    hasNotExpired;

  const handlePaymentCancellation = async () => {
    const confirmation = window.confirm(
      `Tem certeza de que deseja cancelar sua assinatura? Seu plano permanecerá ativo até ${expiresAt.toLocaleDateString()}. Após essa data, você perderá o acesso aos benefícios do plano.\n\nObservação: Ao cancelar a assinatura, você não será reembolsado pelo período não utilizado.`,
    );
    if (!confirmation) return;

    try {
      await NextJsApiService.post("/api/cancel", {
        customer_email: user?.email,
      });
      setTimeout(() => {
        onCancel();
      }, 1000);
      toast("Plano cancelado com sucesso!", {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        type: "info",
      });
    } catch {
      toast("Erro ao cancelar plano. Por favor tente novamente!", {
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
    }
  };

  const handlePayment = async () => {
    const { data } = await NextJsApiService.post("/api/checkout", {
      subscription_type: subscriptionType,
      customer_email: user?.email,
    });
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    const stripe = await stripePromise;
    const result = await (stripe as StripeInstance)!.redirectToCheckout({
      sessionId: data.sessionId,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div
      className={`relative flex h-[280px] w-[250px] flex-col items-center justify-start gap-3 rounded-xl border border-gray-800 bg-dark-gray p-5 ${
        disabled ? "opacity-50" : ""
      }`}
    >
      {isActive && (
        <div className="absolute left-[80px] top-[-10px] flex h-[20px] w-[100px] items-center justify-center rounded bg-green-600 p-2 text-center text-sm">
          Plano Atual
        </div>
      )}
      <div className="text-4xl font-bold">
        {subscriptionSwitchCase[subscriptionType].text}
      </div>
      <div className="h-[1px] w-full bg-gray-800" />
      <span>
        <span className="text-4xl font-bold">
          {subscriptionSwitchCase[subscriptionType].value}
        </span>
        <span className="text-sm font-light">
          {" "}
          {subscriptionSwitchCase[subscriptionType].recurrency}
        </span>
      </span>
      {!!(subscriptionType !== "month") && (
        <span className="text-sm font-light text-green-600">
          {subscriptionSwitchCase[subscriptionType].discount}
        </span>
      )}
      {!(subscriptionType !== "month") && (
        <span className="text-sm text-gray-400">Não há descontos.</span>
      )}
      {isExpirationPending && (
        <span className="text-xs font-light text-red-500">
          Renova em: {expiresAt.toLocaleDateString()}
        </span>
      )}
      {isCancellationPending && (
        <span className="text-xs font-light text-red-500">
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
