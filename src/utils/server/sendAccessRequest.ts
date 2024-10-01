"use server";
import posthog from "posthog-js";
import { checkUserAuth } from "./checkUserAuth";
import { getUser } from "./getUser";
import { sendMail } from "./sendMail";

export async function sendAccessRequest() {
  try {
    if (await checkUserAuth()) {
      const user = await getUser();
      if (!user)
        throw Error(`Error while sending access request: user not found`);
      posthog.capture("trial_requested", user, {
        send_instantly: true,
      });
      await sendMail({
        text: `${user.user_metadata?.full_name}, ${user.email}, criado em ${new Date(user.created_at).toLocaleDateString()} solicitou o plano gratuito do SearchCast.`,
        to: ["gabriel.unifei2017@gmail.com", "contato@searchcast.app"],
        subject: `${user.user_metadata?.full_name} Solicitou Acesso Gratuito`,
      });
      return await sendMail({
        template: "free-plan-request-requested-template",
        to: user.email as string,
        subject: "Sua Solicitação de Plano Gratuito foi Recebida",
      });
    }
  } catch (err) {
    throw Error(`${err}`);
  }

  throw Error("Unauthorized");
}
