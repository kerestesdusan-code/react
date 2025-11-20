const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, full_name AS "fullName", email, created_at AS "createdAt" FROM users ORDER BY id'
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ error: "Full name and email are required" });
  }

  try {
    const result = await db.query(
      `UPDATE users
      SET full_name = $1, email = $2
      WHERE id = $3
      RETURNING id, full_name AS "fullName", email, created_at AS "createdAt"`,
      [fullName, email, id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({message: "User updated successfully", user: result.rows[0 ]});

  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Error updating user" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM users WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

      res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
