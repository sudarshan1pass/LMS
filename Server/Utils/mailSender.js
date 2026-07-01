const nodemailer = require("nodemailer");
<<<<<<< HEAD
=======
require("dotenv").config();
>>>>>>> 42a4513 (open cors)

exports.mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
<<<<<<< HEAD
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
=======
      service: "gmail",
>>>>>>> 42a4513 (open cors)

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
<<<<<<< HEAD
    });

    await transporter.verify();
    console.log("✅ SMTP Connected");

=======

      tls: {
        rejectUnauthorized: false,
      },

      family: 4, // Force IPv4
    });

    // Verify SMTP connection
    await transporter.verify();
    console.log("✅ SMTP Connected Successfully");

    // Send mail
>>>>>>> 42a4513 (open cors)
    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

<<<<<<< HEAD
    console.log("✅ Email Sent:", info.messageId);
=======
    console.log(`✅ Email sent to ${email}`);
>>>>>>> 42a4513 (open cors)
    return info;

  } catch (error) {
<<<<<<< HEAD
    console.error("❌ Email send failed:", error);
=======
    console.log("❌ Email send failed:", error);
>>>>>>> 42a4513 (open cors)
    throw error;
  }
};