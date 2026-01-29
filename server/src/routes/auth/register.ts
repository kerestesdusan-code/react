import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import db from "../../db/db";
import bcrypt from "bcrypt";
import { verifyRecaptcha } from "../../utils/verifyRecaptcha";
import { generateVerificationToken } from "../../utils/verification";

dotenv.config();

interface RegisterBody {
  email: string;
  password: string;
  fullName: string;
  recaptchaToken?: string;
}

const router = Router();

router.post("/register", async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  const { email, password, fullName, recaptchaToken } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ error: "Email, full name, and password are required." });
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  if (process.env.RECAPTCHA_ENABLED === "true") {
    const isHuman = await verifyRecaptcha(recaptchaToken || null);
    if (!isHuman) {
      return res.status(400).json({ error: "reCAPTCHA verification failed." });
    }
  }

  try {
    const existing = await db.query<{ id: string }>(
      `SELECT id FROM "user" WHERE email = $1`,
      [email]
    );

    if ((existing.rowCount || 0) > 0) {
      return res.status(400).json({ error: "User already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const { token, hash } = generateVerificationToken();

    await db.query(
      `
      INSERT INTO "user" (
        email,
        password_hash,
        full_name, 
        is_verified, 
        email_verification_token_hash, 
        email_verification_expires_at
      )
      VALUES ($1, $2, $3, false, $4, now() + interval '24 hours')
      `,
      [email, passwordHash, fullName, hash]
    );

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const verifyLink = `${frontendUrl}/verify?token=${token}&email=${encodeURIComponent(email)}`;
    console.log("VERIFY LINK:", verifyLink);

    return res.status(201).json({ message: "Registration successful. Check your email to verify your account." });
  } catch (error: any) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
