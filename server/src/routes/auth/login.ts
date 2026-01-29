import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import db from "../../db/db";
import bcrypt from "bcrypt";
import { verifyRecaptcha } from "../../utils/verifyRecaptcha";
import jwt from "jsonwebtoken";

dotenv.config();

interface LoginBody {
  email: string;
  password: string;
  recaptchaToken?: string;
}

const router = Router();

router.post("/login", async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password, recaptchaToken } = req.body;

<<<<<<< HEAD
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
=======
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  if (process.env.RECAPTCHA_ENABLED === "true") {
    const isHuman = await verifyRecaptcha(recaptchaToken || null);
    if (!isHuman) {
      return res.status(400).json({ error: "reCAPTCHA verification failed." });
    }
  }


  try {
    const userResult = await db.query<{
      id: string;
      email: string;
      full_name: string | null;
      password_hash: string;
      is_verified: boolean;
    }>(
      `
      SELECT id, email, full_name, password_hash, is_verified
      FROM "user"
      WHERE email = $1
      `,
      [email]
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = userResult.rows[0];

    if (!user.is_verified) {
      return res
        .status(403)
        .json({ error: "Email not verified. Please check your inbox." });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect login details." });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
>>>>>>> 8622f51 (features: stable backend, groups, modified users, auth, jwt validation)
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
<<<<<<< HEAD
        role: user.role,
        createdAt: user.created_at,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error.message);
=======
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
>>>>>>> 8622f51 (features: stable backend, groups, modified users, auth, jwt validation)
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;

