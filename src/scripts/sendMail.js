require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const recipients = [];

(async function () {
  try {
    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      "email",
      ".html",
    );
    const htmlTemplate = fs.readFileSync(templatePath, "utf8");

    const emailBatch = recipients.map((email) => ({
      from: "SearchCast <contato@searchcast.app>",
      to: [email],
      subject: "",
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
