import { Router, Request, Response } from "express";
import db from "../../db/db";
import { hashVerificationToken } from "../../utils/verification";

const router = Router();

router.get("/verify", async (req: Request, res: Response) => {
  const token = String(req.query.token || "");
  const email = String(req.query.email || "");

  if (!token || !email) {
    return res.status(400).json({ error: "Missing token or email." });
  }

  try {
    const tokenHash = hashVerificationToken(token);

    const result = await db.query<{ id: string }>(
      `
      UPDATE "user"
      SET is_verified = true,
          email_verification_token_hash = NULL,
          email_verification_expires_at = NULL
      WHERE email = $1
        AND email_verification_token_hash = $2
        AND email_verification_expires_at > now()
      RETURNING id
      `,
      [email, tokenHash]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    return res.json({ message: "Email verified." });
  } catch (error: any) {
    console.error("Verify error", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
