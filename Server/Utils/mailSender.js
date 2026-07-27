const nodemailer = require("nodemailer");
const SibApiV3Sdk = require("sib-api-v3-sdk");

const getEnv = (key) => process.env[key]?.trim();

const sendWithBrevo = async ({
  email,
  title,
  body,
  senderEmail,
  senderName,
}) => {
  const apiClient = SibApiV3Sdk.ApiClient.instance;

  apiClient.authentications["api-key"].apiKey =
    getEnv("BREVO_API_KEY");

  const apiInstance =
    new SibApiV3Sdk.TransactionalEmailsApi();

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
  const senderName =
    getEnv("MAIL_FROM_NAME") || "StudyNotion";

  const senderEmail =
    getEnv("MAIL_FROM") || getEnv("MAIL_USER");

  const brevoApiKey = getEnv("BREVO_API_KEY");

  if (!senderEmail) {
    throw new Error(
      "MAIL_FROM or MAIL_USER environment variable is required"
    );
  }

  // ==========================================
  // 1. BREVO — PRIMARY
  // ==========================================

  if (brevoApiKey) {
    try {
      const response = await sendWithBrevo({
        email,
        title,
        body,
        senderEmail,
        senderName,
      });

      console.log("Email sent successfully using Brevo");

      return response;
    } catch (error) {
      console.error(
        "BREVO ERROR:",
        error.response?.body || error.message
      );

      // Continue to SMTP fallback
    }
  }

  // ==========================================
  // 2. SMTP — FALLBACK
  // ==========================================

  if (getEnv("MAIL_USER") && getEnv("MAIL_PASS")) {
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
      console.error(
        "SMTP ERROR:",
        error.message
      );

      throw new Error(
        `Unable to send email: ${error.message}`
      );
    }
  }

  throw new Error(
    "Email service is not configured. Set BREVO_API_KEY or SMTP credentials."
  );
};