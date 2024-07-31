const fs = require("fs");
const path = require("path");
const { Resend } = require("resend");

const resend = new Resend(""); // fill the resend api key

(async function () {
  try {
    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      "email",
      "", // fill the template here, ex: "welcome-leads-email-template.html" from the templates folder
    );
    const htmlTemplate = fs.readFileSync(templatePath, "utf8");

    const { data, error } = await resend.emails.send({
      from: "SearchCast Marketing <contato@searchcast.app>", // change the from if needed
      to: [], // fill the emails here
      subject: "", // fill the subject here
      html: htmlTemplate,
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  } catch (err) {
    console.error("Error reading HTML template:", err);
  }
})();
