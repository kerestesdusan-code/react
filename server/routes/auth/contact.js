const express = require("express");
const router = express.Router();
require("dotenv").config();
const nodemailer = require("nodemailer");
const axios = require("axios");

const verifyRecaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
  const { data } = await axios.post(verifyUrl);
  return data.success;
};

router.post("/contact", async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Name, email and message are required." });
  }

  const isHuman = true;
    if (!isHuman) {
    return res.status(400).json({ error: "reCAPTCHA verification failed." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const adminEmail = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.ADMIN_EMAIL,
    subject: "New Contact Form Message",
    text: `You received a message from:
Name: ${name}
Email: ${email}
Message:
${message}`,
  };

  const userEmail = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "We received your message!",
    text: `Hello ${name},

Thank you for reaching out. We have received your message and will get back to you shortly.

Best regards,
Dusan`,
  };

  try {
    await transporter.sendMail(adminEmail);
    await transporter.sendMail(userEmail);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.log("Error sending email:", error);
    res.status(500).json({ error: "Failed to send emails." });
  }
});

module.exports = router;
