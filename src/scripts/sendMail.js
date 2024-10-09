const fs = require("fs");
const path = require("path");
const { Resend } = require("resend");

const resend = new Resend("re_jBs6EEnH_BL1Ndx7f2tKqyfiTVTjmBpTC");

const recipients = [
  "jioiijyuri@gmail.com",
  "guilhermeeber6@gmail.com",
  "jarbaspinheiro44@gmail.com",
  "carloshenriquetrabalho01@gmail.com",
];

(async function () {
  try {
    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      "email",
      "beta-request-accepted-template.html",
    );
    const htmlTemplate = fs.readFileSync(templatePath, "utf8");

    const emailBatch = recipients.map((email) => ({
      from: "SearchCast <contato@searchcast.app>",
      to: [email],
      subject: "Acesso ao BETA Liberado!",
      html: htmlTemplate,
    }));

    const { data, error } = await resend.batch.send(emailBatch);

    if (error) {
      return console.error({ error });
    }

    console.log("Emails sent successfully:", data);
  } catch (err) {
    console.error("Error:", err);
  }
})();
