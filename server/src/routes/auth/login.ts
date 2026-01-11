import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import db from "../../db/db";
import bcrypt from "bcrypt";
import { verifyRecaptcha } from "../../utils/verifyRecaptcha";

dotenv.config();

interface LoginBody {
  email: string;
  password: string;
  recaptchaToken?: string;
}

const router = Router();

router.post("/login", async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password, recaptchaToken } = req.body;

  const recaptchaRequired = process.env.RECAPTCHA_DISABLED !== "true";

  // v test mode nevyžadujeme token, v produkcii áno
  if (!email || !password || (recaptchaRequired && !recaptchaToken)) {
    return res.status(400).json({
      error: "Email, password and reCAPTCHA are required.",
    });
  }

  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return res.status(400).json({ error: "reCAPTCHA verification failed." });
  }

  try {
    const result = await db.query<{
      id: string;
      email: string;
      password_hash: string;
      full_name: string;
      role: string;
      created_at: string;
    }>(
      `SELECT id, email, password_hash, full_name, role, created_at
       FROM users
       WHERE email = $1`,
      [email]
    );

    if ((result.rowCount || 0) === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const user = result.rows[0];

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    return res.status(200).json({
      message: "Login successful.",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        createdAt: user.created_at,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;

