const express = require("express");
const router = express.Router();
const nano = require("nano")("http://admin:123@127.0.0.1:5984");

const usersDb = nano.db.use("users");

router.get("/", async (req, res) => {
  try {
    const userList = await usersDb.list({ include_docs: true });
    const users = userList.rows.map((row) => row.doc);
    res.json(users);
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
    const user = await usersDb.get(id);
    user.fullName = fullName;
    user.email = email;

    await usersDb.insert(user);
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Error updating user" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersDb.get(id);
    await usersDb.destroy(user._id, user._rev);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
