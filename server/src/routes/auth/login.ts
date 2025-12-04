import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import db from "../../db/db";
import bcrypt from "bcrypt";
import { verifyRecaptcha } from "../../utils/verifyRecaptcha";

dotenv.config();

interface LoginBody {
  email: string;
  password: string;
  recaptchaToken: string;
}

const router = Router();

router.post(
  "/login",
  async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { email, password, recaptchaToken } = req.body;

    if (!email || !password || !recaptchaToken) {
      return res
        .status(400)
        .json({ error: "Email, password and reCAPTCHA are required." });
    }

    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return res
        .status(400)
        .json({ error: "reCAPTCHA verification failed." });
    }

    try {
      const userResult = await db.query<{
        id: number;
        email: string;
        full_name: string;
        password_hash: string;
      }>(
        "SELECT id, email, full_name, password_hash FROM users WHERE email = $1",
        [email]
      );

      if (userResult.rowCount === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      const user = userResult.rows[0];

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: "Incorrect login details." });
      }

      const token = `${user.id}:${user.email}`;

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
        },
      });
    } catch (error: any) {
      console.error("Login error:", error.message);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

export default router;
