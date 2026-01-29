import { Router, Response } from "express";
import db from "../../db/db";
import { requireAuth, AuthRequest } from "../../middleware/requireAuth";
import { error } from "console";

const router = Router();

/**
 * POST /api/group
 * body: { name: string }
 */
router.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Group name is required" });
  }

  try {
    const groupResult = await db.query<{ id: string; name: string }>(
      `
      INSERT INTO "group" (name, owner_id)
      VALUES ($1, $2)
      RETURNING id, name
      `,
      [name.trim(), userId]
    );

    const group = groupResult.rows[0];

    await db.query(
      `
      INSERT INTO user_has_group (user_id, group_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
      `,
      [userId, group.id]
    );

    return res.status(201).json({
      group: {
        id: group.id,
        name: group.name,
      },
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Group name already exists" });
    }
    console.error("POST /group error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/group
 * list all groups
 */
router.get("/", requireAuth, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;


  try {
    const result = await db.query<{
      id: string;
      name: string;
      owner_id: string;
      created_at: string;
      member_count: string;
      is_member: boolean;
    }>(
      `
      SELECT
      g.id,
      g.name,
      g.owner_id,
      g.created_at,
      COUNT(uhg.user_id) AS member_count,
      EXISTS (
        SELECT 1
        FROM user_has_group x
        WHERE x.group_id = g.id AND x.user_id = $1
        ) AS is_member
      FROM "group" g
      LEFT JOIN user_has_group uhg ON uhg.group_id = g.id
      GROUP BY g.id
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return res.json({
      group: result.rows.map((g) => ({
        id: g.id,
        name: g.name,
        ownerId: g.owner_id,
        createdAt: g.created_at,
        memberCount: Number(g.member_count),
        isMember: g.is_member,
      })),
    });
  } catch (err) {
    console.error("GET /group error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


/**
 * POST /api/group/join
 * Join group
 */
router.post("/join", requireAuth, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { groupId } = req.body as { groupId?: string};

  if (!groupId) {
    return res.status(400).json({ error: "groupId is required"});
  }

  try {
    const exists = await db.query(`SELECT id FROM "group" WHERE id = $1`, [groupId]);
    if (exists.rowCount === 0) {
      return res.status(404).json({ error: "Group not found"});
    }

    await db.query(
      `
      INSERT INTO user_has_group (user_id, group_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
      `,
      [userId, groupId]
    );

    return res.json({ message: "Joined Group"});
  } catch (err) {
    console.error("POST /group/join error:", err);
    return res.status(500).json({ error: "Internal server error"});
  }
});

/**
 * POST /api/group/leave
 * Leave group
 */
router.post("/leave", requireAuth, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { groupId } = req.body as { groupId?: string };

  if (!groupId) {
    return res.status(400).json({ error: "groupId is required" });
  }

  try {
    await db.query(
      `
      DELETE FROM user_has_group
      WHERE user_id = $1 AND group_id = $2
      `,
      [userId, groupId]
    );

    return res.json({ message: "Left group" });
  } catch (err) {
    console.error("POST /group/leave error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * PUT /api/group/:id
 * body: { name: string }
 * Only owner can rename group
 */
router.put("/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const grouId = req.params.id;
  const { name } = req.body as { name?: string };

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Group name is required" });
  }

  try {
    const ownerCheck = await db.query<{ owner_id: string }>(
      `SELECT owner_id FROM "group" WHERE id = $1`,
      [grouId]
    );

    if (ownerCheck.rowCount === 0) {
      return res.status(404).json({ error: "Group not found"});
    }

    if (ownerCheck.rows[0].owner_id !== userId) {
      return res.status(403).json({ error: "Only owner can rename this group" });
    }

    const updated = await db.query<{ id: string, name: string}>(
      `
      UPDATE "group"
      SET name = $1
      WHERE id = $2
      RETURNING id, name
      `,
      [name.trim(), grouId]
    );

    return res.json({
      message: "Group renamed",
      group: updated.rows[0],
    });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Group name already exists"});
    }
    console.error("PUT /group/:id error", err);
    return res.status(500).json({ error: "Internal server error"});
  }
});

/**
 * DELETE /api/group/:id/member/:userId
 * Only owner can kick a member from group
 */
router.delete("/:id/member/:userId", requireAuth, async (req: AuthRequest, res: Response) => {
  const callerId = req.user!.userId;
  const groupId = req.params.id;
  const targetUserId = req.params.userId;

  if (callerId === targetUserId) {
    return res.status(400).json({ error: "Owner cannot kick themselves. Use /group/leave instead." });
  }

  try {
    const ownerCheck = await db.query<{ owner_id: string }>(
      `SELECT owner_id FROM "group" WHERE id = $1`,
      [groupId]
    );

    if (ownerCheck.rowCount === 0) {
      return res.status(404).json({ error: "Group not found" });
    }

    if (ownerCheck.rows[0].owner_id !== callerId) {
      return res.status(403).json({ error: "Only owner can kick members" });
    }

    const del = await db.query(
      `
      DELETE FROM user_has_group
      WHERE group_id = $1 AND user_id = $2
      RETURNING user_id, group_id
      `,
      [groupId, targetUserId]
    );

    if (del.rowCount === 0) {
      return res.status(404).json({ error: "User is not a member of this group" });
    }

    return res.json({ message: "Member kicked" });
  } catch (err: any) {
    console.error("DELETE /group/:id/member/:userId error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/group/:id/members
 * List members of a group
 */
router.get("/:id/members", requireAuth, async (req: AuthRequest, res: Response) => {
  const grouId = req.params.id;

  try {
    const exists = await db.query(`SELECT id FROM "group" WHERE id = $1`, [grouId]);
    if (exists.rowCount === 0) {
      return res.status(404).json({ error: "Group not found"});
    }

     const members = await db.query<{
      id: string;
      email: string;
      full_name: string | null;
      avatar_url: string | null;
      joined_at: string;
    }>(
      `
      SELECT
      u.id,
      u.email,
      u.full_name,
      u.avatar_url,
      uhg.joined_at
      FROM user_has_group uhg
      JOIN "user" u ON u.id = uhg.user_id
      WHERE uhg.group_id = $1
      ORDER BY uhg.joined_at ASC
      `,
      [grouId]
    );

    return res.json({
      members: members.rows.map((m) => ({
        id: m.id,
        email: m.email,
        fullName: m.full_name,
        avatarUrl: m.avatar_url,
        joinedAt: m.joined_at,
      })),
    });
  } catch (err: any) {
    console.error("GET /group/:id/members error:", err);
    return res.status(500).json({ error: "Internal server error"});
  }
});

export default router;
