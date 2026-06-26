const dns = require("node:dns");
const nodemailer = require("nodemailer");
require("dotenv").config();

dns.setDefaultResultOrder("ipv4first");

const getBooleanEnv = (name, defaultValue) => {
  const value = process.env[name];

  if (value === undefined || value === "") {
    return defaultValue;
  }

  return value.toLowerCase() === "true";
};

const getNumberEnv = (name, defaultValue) => {
  const value = process.env[name];

  if (value === undefined || value === "") {
    return defaultValue;
  }

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    throw new Error(`${name} must be a valid number`);
  }

  return numberValue;
};

exports.mailSender = async (email, title, body) => {
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;

  if (!user || !pass) {
    throw new Error("MAIL_USER and MAIL_PASS are required to send email");
  }

  const secure = getBooleanEnv("MAIL_SECURE", false);
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: getNumberEnv("MAIL_PORT", secure ? 465 : 587),
    secure,
    requireTLS: getBooleanEnv("MAIL_REQUIRE_TLS", false),
    connectionTimeout: getNumberEnv("MAIL_CONNECTION_TIMEOUT", 10000),
    greetingTimeout: getNumberEnv("MAIL_GREETING_TIMEOUT", 10000),
    socketTimeout: getNumberEnv("MAIL_SOCKET_TIMEOUT", 15000),
    lookup: (hostname, options, callback) => {
      dns.lookup(hostname, { ...options, family: 4 }, callback);
    },
    auth: {
      user,
      pass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || `"StudyNotion" <${user}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log(`Email sent to ${email}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Email send failed for ${email}:`, error.message);
    throw error;
  }
};
