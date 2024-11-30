const express = require("express");
const router = express.Router();
const nano = require("nano")("http://admin:123@127.0.0.1:5984");
const cors = require("cors");
const usersDb = nano.db.use("users");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "POST",
  allowedHeaders: "Content-Type,Authorization",
};

// Apply CORS middleware
router.use(cors(corsOptions));

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userResult = await usersDb.find({ selector: { email } });
    if (userResult.docs.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult.docs[0];
    if (password !== user.password) {
      return res.status(401).json({ error: "Incorrect login details" });
    }

    const token = email; // Jednoduchý token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
