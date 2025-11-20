const express = require("express");
const router = express.Router();
require("dotenv").config();
const db = require("../../db");
const axios = require("axios");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { email, password, recaptchaToken } = req.body;

  if (!email || !password || !recaptchaToken) {
    return res
      .status(400)
      .json({ error: "Email, password and reCAPTCHA are required." });
  }

  try {
        const isHuman = true;
    if (!isHuman) {
      return res.status(400).json({ error: "reCAPTCHA verification failed." });
    }

    const userResult = await db.query(
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
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
