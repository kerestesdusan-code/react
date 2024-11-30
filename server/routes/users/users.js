const express = require("express");
const router = express.Router();
const nano = require("nano")("http://admin:123@127.0.0.1:5984");
const cors = require("cors");
const usersDb = nano.db.use("users");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET",
  allowedHeaders: "Content-Type,Authorization",
};

// Apply CORS middleware
router.use(cors(corsOptions));

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

module.exports = router;
