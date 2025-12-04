import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import db from "../../db/db";
import axios from "axios";
import bcrypt from "bcrypt";
import { verifyRecaptcha } from "../../utils/verifyRecaptcha";

dotenv.config();

interface RegisterBody {
  email: string;
  password: string;
  fullName: string;
  recaptchaToken: string;
}

const router = Router();

router.post("/register", async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  const { email, password, fullName, recaptchaToken } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({
      error: "Email, full name, and password are required.",
    });
  }

  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return res.status(400).json({
      error: "reCAPTCHA verification failed.",
    });
  }

  const emailRegex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  try {
    const existing = await db.query<{ id: number }>(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if ((existing.rowCount || 0) > 0) {
      return res.status(400).json({ error: "User already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3)",
      [email, passwordHash, fullName]
    );

    res.status(201).json({ message: "Registration successful." });
  } catch (error: any) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
