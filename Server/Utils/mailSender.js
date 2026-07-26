const nodemailer = require("nodemailer");
const SibApiV3Sdk = require("sib-api-v3-sdk");

const getEnv = (key) => process.env[key]?.trim();

const getBooleanEnv = (key, defaultValue = false) => {
  const value = getEnv(key);

  if (!value) {
    return defaultValue;
  }

  return ["true", "1", "yes"].includes(value.toLowerCase());
};

const normalizeBrevoApiKey = (value) => {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return null;
  }

  if (trimmedValue.startsWith("xkeysib-")) {
    return trimmedValue;
  }

  try {
    const parsedValue = trimmedValue.startsWith("{")
      ? JSON.parse(trimmedValue)
      : JSON.parse(Buffer.from(trimmedValue, "base64").toString("utf8"));

    return parsedValue.api_key?.trim() || trimmedValue;
  } catch (error) {
    return trimmedValue;
  }
};

const sendWithSmtp = async ({ email, title, body, senderEmail, senderName }) => {
  const secure = getBooleanEnv("MAIL_SECURE", false);
  const mailHost = getEnv("MAIL_HOST") || "smtp.gmail.com";
  const mailPort = Number(getEnv("MAIL_PORT")) || (secure ? 465 : 587);
  const mailUser = getEnv("MAIL_USER");
  const mailPass = getEnv("MAIL_PASS")?.replace(/\s/g, "");

  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure,
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

const sendWithBrevo = async ({ email, title, body, senderEmail, senderName }) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications["api-key"];

  apiKey.apiKey = normalizeBrevoApiKey(getEnv("BREVO_API_KEY"));

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  return apiInstance.sendTransacEmail({
    sender: {
      email: senderEmail,
      name: senderName,
    },
    to: [{ email }],
    subject: title,
    htmlContent: body,
  });
};

exports.mailSender = async (email, title, body) => {
  const senderName = getEnv("MAIL_FROM_NAME") || "StudyNotion";
  const mailUser = getEnv("MAIL_USER");
  const mailPass = getEnv("MAIL_PASS");
  const brevoApiKey = getEnv("BREVO_API_KEY");
  const senderEmail = getEnv("MAIL_FROM") || mailUser;

  if (!senderEmail) {
    throw new Error("MAIL_FROM or MAIL_USER is required to send email");
  }

  try {
    if (mailUser && mailPass) {
      const data = await sendWithSmtp({
        email,
        title,
        body,
        senderEmail,
        senderName,
      });

      console.log("Email sent successfully with SMTP");
      return data;
    }

    if (brevoApiKey) {
      const data = await sendWithBrevo({
        email,
        title,
        body,
        senderEmail,
        senderName,
      });

      console.log("Email sent successfully with Brevo");
      return data;
    }

    throw new Error("Configure MAIL_USER and MAIL_PASS, or BREVO_API_KEY");
  } catch (error) {
    console.log("Email error:", error.response?.body || error.message);
    throw error;
  }
};
