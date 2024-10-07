"use server";
import { NextRequest } from "next/server";
import { getUser } from "./getUser";
import { sendMail } from "./sendMail";
import { updateUser } from "./updateUser";

export async function sendAccessRequest(req: NextRequest) {
  try {
    const user = await getUser();
    if (!user) throw Error(`Error while sending access request`);
    const updateResult = await updateUser(req, user, {
      beta_access_requested: true,
    });
    if (updateResult) {
      await sendMail({
        text: `${user.user_metadata?.full_name}, ${user.email}, criado em ${new Date(user.created_at).toLocaleDateString()} solicitou o acesso ao BETA do SearchCast.`,
        to: ["gabriel.unifei2017@gmail.com"],
        subject: `${user.user_metadata?.full_name} Solicitou Acesso BETA`,
      });
      await sendMail({
        template: "beta-request-requested-template",
        to: user.email as string,
        subject: "Acesso ao BETA Solicitado!",
      });
    }
  } catch (err) {
    throw Error(`${err}`);
  }
}
