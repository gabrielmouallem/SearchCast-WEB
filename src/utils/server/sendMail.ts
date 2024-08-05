"use server";
import { Resend } from "resend";
import { readTemplate } from "./templateReader";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

// Define a type that ensures either template or text is present, but not both
type SendMailArgs =
  | { template: string; subject: string; to: string | string[]; text?: never }
  | { text: string; subject: string; to: string | string[]; template?: never };

export async function sendMail(args: SendMailArgs) {
  const { subject, to } = args;
  let htmlTemplate: string | undefined;
  let textTemplate: string | undefined;

  try {
    if (args?.template) {
      htmlTemplate = await readTemplate(args.template);
    } else if (args?.text) {
      textTemplate = args.text;
    }

    const { data, error } = await resend.emails.send({
      from: "SearchCast <contato@searchcast.app>",
      to,
      subject,
      html: htmlTemplate ?? "",
      text: textTemplate ?? "",
    });

    if (error) {
      console.log({ error });
      throw Error(`Error sending email: ${error}`);
    }
    return data;
  } catch (err) {
    throw Error(`${err}`);
  }
}
