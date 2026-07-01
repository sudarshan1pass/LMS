const SibApiV3Sdk = require("sib-api-v3-sdk");

exports.mailSender = async (email, title, body) => {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;

  // API Key
  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.MAIL_PASS;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    sender: {
      email: process.env.MAIL_USER,
      name: "StudyNotion",
    },

    to: [{ email }],

    subject: title,

    htmlContent: body,
  };

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent successfully");
    return data;
  } catch (error) {
    console.log("❌ Email error:", error);
    throw error;
  }
};