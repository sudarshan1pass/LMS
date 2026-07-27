const nodemailer = require("nodemailer");
const SibApiV3Sdk = require("sib-api-v3-sdk");

const getEnv = (key) => {
  const value = process.env[key];

  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  return trimmed.replace(/^["'](.*)["']$/, "$1").trim();
};

const getBrevoApiKey = () => {
  const apiKey =
    getEnv("BREVO_API_KEY") ||
    getEnv("SENDINBLUE_API_KEY") ||
    getEnv("SIB_API_KEY");

  if (!apiKey) {
    return undefined;
  }

  return apiKey
    .replace(/^(BREVO_API_KEY|SENDINBLUE_API_KEY|SIB_API_KEY)\s*=\s*/i, "")
    .replace(/\s/g, "");
};

const getBrevoErrorMessage = (error) =>
  error.response?.body?.message ||
  error.response?.text ||
  error.message ||
  "Unknown Brevo error";

const sendWithBrevo = async ({
  email,
  title,
  body,
  senderEmail,
  senderName,
  apiKey,
}) => {
  const apiClient = SibApiV3Sdk.ApiClient.instance;

  apiClient.authentications["api-key"].apiKey = apiKey;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  return apiInstance.sendTransacEmail({
    sender: {
      email: senderEmail,
      name: senderName,
    },
    to: [
      {
        email: email,
      },
    ],
    subject: title,
    htmlContent: body,
  });
};

const sendWithSmtp = async ({
  email,
  title,
  body,
  senderEmail,
  senderName,
}) => {
  const mailUser = getEnv("MAIL_USER");
  const mailPass = getEnv("MAIL_PASS")?.replace(/\s/g, "");

  if (!mailUser || !mailPass) {
    throw new Error("SMTP credentials are missing");
  }

  const transporter = nodemailer.createTransport({
    host: getEnv("MAIL_HOST") || "smtp.gmail.com",
    port: Number(getEnv("MAIL_PORT")) || 587,
    secure: getEnv("MAIL_SECURE") === "true",

    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });

  return transporter.sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to: email,
    subject: title,
    html: body,
  });
};

exports.mailSender = async (email, title, body) => {
  const senderName = getEnv("MAIL_FROM_NAME") || "StudyNotion";
  const senderEmail = getEnv("MAIL_FROM") || getEnv("MAIL_USER");
  const brevoApiKey = getBrevoApiKey();
  const smtpConfigured = getEnv("MAIL_USER") && getEnv("MAIL_PASS");
  const providerErrors = [];

  if (!senderEmail) {
    throw new Error(
      "MAIL_FROM or MAIL_USER environment variable is required"
    );
  }

  if (brevoApiKey) {
    if (!brevoApiKey.startsWith("xkeysib-")) {
      providerErrors.push(
        "BREVO_API_KEY must be a Brevo API v3 key that starts with xkeysib-."
      );
    } else {
      try {
        const response = await sendWithBrevo({
          email,
          title,
          body,
          senderEmail,
          senderName,
          apiKey: brevoApiKey,
        });

        console.log("Email sent successfully using Brevo");

        return response;
      } catch (error) {
        const brevoError = getBrevoErrorMessage(error);

        console.error("BREVO ERROR:", brevoError);
        providerErrors.push(`Brevo failed: ${brevoError}.`);
      }
    }
  }

  if (smtpConfigured) {
    try {
      const response = await sendWithSmtp({
        email,
        title,
        body,
        senderEmail,
        senderName,
      });

      console.log("Email sent successfully using SMTP");

      return response;
    } catch (error) {
      console.error("SMTP ERROR:", error.message);

      throw new Error(
        [...providerErrors, `SMTP failed: ${error.message}.`].join(" ")
      );
    }
  }

  const setupMessage =
    "Set a valid BREVO_API_KEY in Render, or set SMTP credentials: MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, and MAIL_FROM.";

  if (providerErrors.length > 0) {
    throw new Error(`${providerErrors.join(" ")} ${setupMessage}`);
  }

  throw new Error(`Email service is not configured. ${setupMessage}`);
};
