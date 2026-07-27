const nodemailer = require("nodemailer");
const SibApiV3Sdk = require("sib-api-v3-sdk");

const BREVO_API_PREFIX = "xkeysib-";
const SMTP_REQUIRED_KEYS = [
  "MAIL_HOST",
  "MAIL_PORT",
  "MAIL_USER",
  "MAIL_PASS",
  "MAIL_FROM",
];

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

const cleanSecret = (value, names = []) => {
  if (!value) {
    return undefined;
  }

  const assignmentPattern = new RegExp(
    `^(${names.join("|")})\\s*=\\s*`,
    "i"
  );

  return value.replace(assignmentPattern, "").replace(/\s/g, "");
};

const getBrevoApiKey = () =>
  cleanSecret(
    getEnv("BREVO_API_KEY") ||
      getEnv("SENDINBLUE_API_KEY") ||
      getEnv("SIB_API_KEY"),
    ["BREVO_API_KEY", "SENDINBLUE_API_KEY", "SIB_API_KEY"]
  );

const isBrevoApiKeyValid = (apiKey) =>
  Boolean(apiKey && apiKey.startsWith(BREVO_API_PREFIX));

const isEnabled = (key) => {
  const value = getEnv(key);

  return ["true", "1", "yes"].includes(value?.toLowerCase());
};

const redactKnownSecrets = (message) => {
  let safeMessage = String(message || "");
  const secrets = [
    getBrevoApiKey(),
    cleanSecret(getEnv("MAIL_PASS"), ["MAIL_PASS"]),
  ].filter(Boolean);

  for (const secret of secrets) {
    safeMessage = safeMessage.split(secret).join("[redacted]");
  }

  return safeMessage;
};

const getBrevoErrorMessage = (error) =>
  redactKnownSecrets(
    error.response?.body?.message ||
      error.response?.text ||
      error.message ||
      "Unknown Brevo error"
  );

const getSmtpErrorMessage = (error) =>
  redactKnownSecrets(error.message || "Unknown SMTP error");

const getSmtpConfig = () => {
  const config = {
    host: getEnv("MAIL_HOST"),
    port: Number(getEnv("MAIL_PORT")),
    secure: getEnv("MAIL_SECURE") === "true",
    user: getEnv("MAIL_USER"),
    pass: cleanSecret(getEnv("MAIL_PASS"), ["MAIL_PASS"]),
    from: getEnv("MAIL_FROM"),
    fromName: getEnv("MAIL_FROM_NAME") || "StudyNotion",
    connectionTimeout:
      Number(getEnv("SMTP_CONNECTION_TIMEOUT_MS")) || 8000,
    greetingTimeout:
      Number(getEnv("SMTP_GREETING_TIMEOUT_MS")) || 8000,
    socketTimeout: Number(getEnv("SMTP_SOCKET_TIMEOUT_MS")) || 10000,
  };

  const missingKeys = SMTP_REQUIRED_KEYS.filter((key) => !getEnv(key));
  const invalidKeys = [];

  if (getEnv("MAIL_PORT") && !Number.isInteger(config.port)) {
    invalidKeys.push("MAIL_PORT");
  }

  return {
    ...config,
    missingKeys,
    invalidKeys,
    ready: missingKeys.length === 0 && invalidKeys.length === 0,
  };
};

const getMailConfigDiagnostics = () => {
  const brevoApiKey = getBrevoApiKey();
  const smtpConfig = getSmtpConfig();

  return {
    brevoApiKeyExists: Boolean(brevoApiKey),
    brevoApiKeyStartsWithXkeysib: isBrevoApiKeyValid(brevoApiKey),
    brevoApiKeyTrimmedLength: brevoApiKey?.length || 0,
    smtpFallbackEnabled: isEnabled("SMTP_FALLBACK_ENABLED"),
    smtp: {
      mailHostExists: Boolean(getEnv("MAIL_HOST")),
      mailPortExists: Boolean(getEnv("MAIL_PORT")),
      mailPortValid: !smtpConfig.invalidKeys.includes("MAIL_PORT"),
      mailUserExists: Boolean(getEnv("MAIL_USER")),
      mailPassExists: Boolean(cleanSecret(getEnv("MAIL_PASS"), ["MAIL_PASS"])),
      mailFromExists: Boolean(getEnv("MAIL_FROM")),
    },
  };
};

const logMailConfigDiagnostics = () => {
  console.log("MAIL CONFIG DIAGNOSTICS:", getMailConfigDiagnostics());
};

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

const sendWithSmtp = async ({ email, title, body, smtpConfig }) => {
  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    connectionTimeout: smtpConfig.connectionTimeout,
    greetingTimeout: smtpConfig.greetingTimeout,
    socketTimeout: smtpConfig.socketTimeout,

    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });

  return transporter.sendMail({
    from: `"${smtpConfig.fromName}" <${smtpConfig.from}>`,
    to: email,
    subject: title,
    html: body,
  });
};

exports.mailSender = async (email, title, body) => {
  const senderName = getEnv("MAIL_FROM_NAME") || "StudyNotion";
  const senderEmail = getEnv("MAIL_FROM");
  const brevoApiKey = getBrevoApiKey();
  const smtpFallbackEnabled = isEnabled("SMTP_FALLBACK_ENABLED");
  const smtpConfig = getSmtpConfig();
  const providerErrors = [];

  console.log("MAIL SEND CONFIG:", getMailConfigDiagnostics());

  if (isBrevoApiKeyValid(brevoApiKey)) {
    if (!senderEmail) {
      providerErrors.push("MAIL_FROM is required for Brevo sending.");
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
  } else if (brevoApiKey) {
    providerErrors.push(
      "BREVO_API_KEY is set but invalid. It must be a Brevo API v3 key that starts with xkeysib-."
    );
  } else {
    providerErrors.push("BREVO_API_KEY is not configured.");
  }

  if (!smtpFallbackEnabled) {
    throw new Error(
      `${providerErrors.join(" ")} SMTP fallback is disabled. Set SMTP_FALLBACK_ENABLED=true only when SMTP is available and configured.`
    );
  }

  if (!smtpConfig.ready) {
    const issues = [
      ...smtpConfig.missingKeys.map((key) => `missing ${key}`),
      ...smtpConfig.invalidKeys.map((key) => `invalid ${key}`),
    ].join(", ");

    throw new Error(
      `${providerErrors.join(" ")} SMTP_FALLBACK_ENABLED=true, but SMTP configuration is incomplete: ${issues}.`
    );
  }

  try {
    const response = await sendWithSmtp({
      email,
      title,
      body,
      smtpConfig,
    });

    console.log("Email sent successfully using SMTP");

    return response;
  } catch (error) {
    const smtpError = getSmtpErrorMessage(error);

    console.error("SMTP ERROR:", smtpError);

    throw new Error(
      `${providerErrors.join(" ")} SMTP failed: ${smtpError}.`
    );
  }
};

exports.getMailConfigDiagnostics = getMailConfigDiagnostics;
exports.logMailConfigDiagnostics = logMailConfigDiagnostics;
