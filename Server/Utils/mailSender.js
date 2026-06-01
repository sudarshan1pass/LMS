// const nodemailer = require("nodemailer")
// const dns = require("node:dns")
// require("dotenv").config()

// dns.setDefaultResultOrder("ipv4first")

// exports.mailSender = async (email, title, body) => {
//     if (process.env.RESEND_API_KEY) {
//         const response = await fetch("https://api.resend.com/emails", {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 from: process.env.MAIL_FROM || "StudyNotion <onboarding@resend.dev>",
//                 to: email,
//                 subject: title,
//                 html: body,
//             }),
//         })

//         const data = await response.json()

//         if (!response.ok) {
//             throw new Error(data?.message || "Resend email failed")
//         }

//         console.log(`Email sent to ${email}: ${data.id}`)
//         return data
//     }

//     if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
//         throw new Error("MAIL_USER and MAIL_PASS are required to send email")
//     }

//     const transporter = nodemailer.createTransport({
//         host: process.env.MAIL_HOST || "smtp.gmail.com",
//         port: Number(process.env.MAIL_PORT) || 465,
//         secure: process.env.MAIL_SECURE ? process.env.MAIL_SECURE === "true" : true,
//         requireTLS: process.env.MAIL_REQUIRE_TLS ? process.env.MAIL_REQUIRE_TLS === "true" : false,
//         connectionTimeout: Number(process.env.MAIL_CONNECTION_TIMEOUT) || 10000,
//         greetingTimeout: Number(process.env.MAIL_GREETING_TIMEOUT) || 10000,
//         socketTimeout: Number(process.env.MAIL_SOCKET_TIMEOUT) || 15000,
//         lookup: (hostname, options, callback) => {
//             dns.lookup(hostname, { ...options, family: 4 }, callback)
//         },
//         auth: {
//             user: process.env.MAIL_USER,
//             pass: process.env.MAIL_PASS,
//         },
//     })

//     try {
//         const info = await transporter.sendMail({
//             from: process.env.MAIL_FROM || `"StudyNotion" <${process.env.MAIL_USER}>`,
//             to: email,
//             subject: title,
//             html: body,
//         })

//         console.log(`Email sent to ${email}: ${info.messageId}`)
//         return info
//     }
//     catch (error) {
//         console.error("Email send failed:", error.message)
//         throw error
//     }
// }

const nodemailer = require("nodemailer");
require("dotenv").config();

exports.mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: process.env.MAIL_SECURE === "true",
      requireTLS: process.env.MAIL_REQUIRE_TLS === "true",

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // SMTP connection test
    await transporter.verify();
    console.log("✅ SMTP Connected Successfully");

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Email Sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Email Send Error:", error);

    throw new Error(error.message);
  }
};