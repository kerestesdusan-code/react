import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import { verifyRecaptcha } from "../../utils/verifyRecaptcha";

const router = Router();

router.post("/contact", async (req: Request, res: Response) => {
  const { name, email, message, recaptchaToken } = req.body as {
    name?: string;
    email?: string;
    message?: string;
    recaptchaToken?: string;
  };

  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    console.log("[contact] called", { ip: req.ip });
  }

  // --- basic payload check ---
  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: "Name, email, and message are required.",
    });
  }

  // --- reCAPTCHA ---
  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return res.status(400).json({
      ok: false,
      error: "reCAPTCHA verification failed.",
    });
  }

  // --- SMTP ENV ---
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL;
  const fromEmail = process.env.SMTP_FROM || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !adminEmail || !fromEmail) {
    console.error("[contact_error] Email service not configured (missing env vars)");
    return res.status(500).json({
      ok: false,
      error: "Email service not configured.",
    });
  }

  // --- Nodemailer transport (587 + STARTTLS) ---
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,          // STARTTLS on 587
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    requireTLS: true,
    tls: { minVersion: "TLSv1.2" },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const adminMail = {
    from: fromEmail,
    to: adminEmail,
    replyTo: email,
    subject: "New Contact Form Message",
    text: `You received a message from:

Name: ${name}
Email: ${email}

Message:
${message}
`,
  };

  const userMail = {
    from: fromEmail,
    to: email,
    subject: "We received your message",
    text: `Hello ${name},

Thank you for contacting us. We will get back to you shortly.

Best regards,
DKReactive`,
  };

  try {
    await transporter.verify();
    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    return res.status(200).json({
      ok: true,
      message: "Message sent successfully.",
    });
  } catch (err: any) {
    // log minimal info (no secrets)
    console.error("[contact_error] send failed", {
      message: err?.message,
      code: err?.code,
      responseCode: err?.responseCode,
    });

    return res.status(500).json({
      ok: false,
      error: "Failed to send email.",
    });
  }
});

export default router;

