import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import db from "../../db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const isHuman = await verifyRecaptcha(recaptchaToken, req.ip);
  if (!isHuman) {
    return res.status(400).json({ error: "reCAPTCHA verification failed." });
  }

  try {
    const result = await db.query<{
      id: string;
      email: string;
      full_name: string | null;
      password_hash: string;
      is_verified: boolean;
      group_id: number | null;
    }>(
      `
      SELECT
        u.id,
        u.email,
        u.full_name,
        u.password_hash,
        u.is_verified,
        (
          SELECT uhg.group_id
          FROM user_has_group uhg
          WHERE uhg.user_id = u.id
          ORDER BY uhg.joined_at ASC
          LIMIT 1
        ) AS group_id
      FROM "user" u
      WHERE u.email = $1
      `,
      [email.trim().toLowerCase()]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const user = result.rows[0];

    if (!user.is_verified) {
      return res.status(403).json({ error: "Email not verified." });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    if (!process.env.JWT_SECRET) {
      console.error("Missing JWT_SECRET");
      return res.status(500).json({ error: "Internal server error." });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        groupId: user.group_id ?? 0,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
