import { Router, Response } from "express";
import db from "../../db/db";
import { requireAuth, AuthRequest } from "../../middleware/requireAuth";

const router = Router();

router.get("/me", requireAuth, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;

  try {
    const userResult = await db.query<{
      id: string;
      email: string;
      full_name: string | null;
      avatar_url: string | null;
      is_verified: boolean;
    }>(
      `SELECT id, email, full_name, avatar_url, is_verified
       FROM "user"
       WHERE id = $1`,
      [userId]
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult.rows[0];

    const groupsResult = await db.query<{ id: string; name: string }>(
      `SELECT g.id, g.name
       FROM user_has_group uhg
       JOIN "group" g ON g.id = uhg.group_id
       WHERE uhg.user_id = $1
       ORDER BY g.name`,
      [userId]
    );

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        avatarUrl: user.avatar_url,
        isVerified: user.is_verified,
        group: groupsResult.rows,
      },
    });
  } catch (err) {
    console.error("GET /auth/me error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
