import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/utils/server/getUser";
import { sendMail } from "@/utils/server/sendMail";
import { updateUser } from "@/utils/server/updateUser";

export async function POST(req: NextRequest) {
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: `${err}` }, { status: 500 });
  }
}
