import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { verifyRecaptcha } from "../../utils/verifyRecaptcha";

dotenv.config();

const router = Router();

router.post("/contact", async (req: Request, res: Response) => {
  const { name, email, message, recaptchaToken } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Name, email, and message are required.",
    });
  }

  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return res.status(400).json({
      error: "reCAPTCHA verification failed.",
    });
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
Message: ${message}`,
  };

  const userEmail = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "We received your message!",
    text: `Hello ${name},

Thank you for reaching out. We will get back to you soon.

Best regards,
Dusan`,
  };

  try {
    await transporter.sendMail(adminEmail);
    await transporter.sendMail(userEmail);

    res.status(200).json({
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.log("Error sending email:", error);
    res.status(500).json({ error: "Failed to send emails." });
  }
});

export default router;
