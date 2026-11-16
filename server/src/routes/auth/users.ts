import { Router, Response } from "express";
import db from "../../db/db";
import bcrypt from "bcrypt";
import { requireAuth, AuthRequest } from "../../middleware/requireAuth";

function hasErrorCode(error: unknown): error is { code: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  );
}

const router = Router();

/**
 * PUT /api/user/me
 * body: { fullName, email }
 */
router.put("/me", requireAuth, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { fullName, email } = req.body as { fullName?: string; email?: string };

  if (!fullName || !fullName.trim() || !email || !email.trim()) {
    return res.status(400).json({ error: "Full name and email are required" });
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  try {
    const result = await db.query(
      `
      UPDATE "user"
      SET full_name = $1,
          email = $2
      WHERE id = $3
      RETURNING id, full_name, email, created_at, avatar_url
      `,
      [fullName.trim(), email.trim().toLowerCase(), userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const u = result.rows[0];

    return res.json({
      message: "Profile updated",
      user: {
        id: u.id,
        fullName: u.full_name,
        email: u.email,
        createdAt: u.created_at,
        avatarUrl: u.avatar_url,
      },
    });
  } catch (error: unknown) {
    if (hasErrorCode(error) && error.code === "23505") {
      return res.status(409).json({ error: "Email already in use" });
    }
    console.error("PUT /user/me error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * PUT /api/user/me/avatar
 * body: { avatarUrl }
 */
router.put("/me/avatar", requireAuth, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { avatarUrl } = req.body as { avatarUrl?: string };

  if (!avatarUrl || !avatarUrl.trim()) {
    return res.status(400).json({ error: "avatarUrl is required" });
  }

  try {
    const result = await db.query(
      `
      UPDATE "user"
      SET avatar_url = $1
      WHERE id = $2
      RETURNING avatar_url
      `,
      [avatarUrl.trim(), userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      message: "Avatar updated",
      avatarUrl: result.rows[0].avatar_url,
    });
  } catch (error: unknown) {
    console.error("PUT /user/me/avatar error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * PUT /api/user/me/password
 * body: { oldPassword, newPassword }
 */
router.put("/me/password", requireAuth, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { oldPassword, newPassword } = req.body as {
    oldPassword?: string;
    newPassword?: string;
  };

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: "oldPassword and newPassword are required" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: "New password must be at least 6 characters" });
  }

  try {
    const userResult = await db.query<{ password_hash: string }>(
      `SELECT password_hash FROM "user" WHERE id = $1`,
      [userId]
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const ok = await bcrypt.compare(oldPassword, userResult.rows[0].password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Old password is incorrect" });
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await db.query(`UPDATE "user" SET password_hash = $1 WHERE id = $2`, [newHash, userId]);

    return res.json({ message: "Password updated" });
  } catch (error: unknown) {
    console.error("PUT /user/me/password error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  const targetUserId = req.params.id;
  const caller = req.user!;
  if (caller.userId !== targetUserId) {
    return res.status(403).json({ error: "You can delete only your own account." });
  }

  try {
    const result = await db.query(`DELETE FROM "user" WHERE id = $1 RETURNING id`, [targetUserId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({ message: "User deleted", id: result.rows[0].id });
  } catch (error: unknown) {
    console.error("Delete user error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const caller = req.user!;
  if (caller.userId !== id) {
    return res.status(403).json({ error: "You can edit only your own account." });
  }

  const { fullName, email } = req.body as { fullName?: string; email?: string };
  if (!fullName || !email) {
    return res.status(400).json({ error: "Full name and email are required" });
  }

  try {
    const result = await db.query(
      `
      UPDATE "user"
      SET full_name = $1, email = $2
      WHERE id = $3
      RETURNING id, full_name, email, created_at, avatar_url
      `,
      [fullName, email, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const u = result.rows[0];

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: u.id,
        fullName: u.full_name,
        email: u.email,
        createdAt: u.created_at,
        avatarUrl: u.avatar_url,
      },
    });
  } catch (error: unknown) {
    if (hasErrorCode(error) && error.code === "23505") {
      return res.status(409).json({ error: "Email already in use" });
    }
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Error updating user" });
  }
});

export default router;
