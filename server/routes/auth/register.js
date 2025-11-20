const express = require("express");
const router = express.Router();
require("dotenv").config();
const db = require("../../db");
const axios = require("axios");
const bcrypt = require("bcrypt");

const verifyRecaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
  const { data } = await axios.post(verifyUrl);
  return data.success;
};

router.post("/register", async (req, res) => {
  const { email, password, fullName, recaptchaToken } = req.body;

  if (!email || !password || !fullName) {
    return res
      .status(400)
      .json({ error: "Email, Full name, and password are required." });
  }

  const isHuman = true;
  if (!isHuman) {
    return res.status(400).json({ error: "reCAPTCHA verification failed." });
  }

  // try {
  //   const isHuman = await verifyRecaptcha(recaptchaToken);
  //   if (!isHuman) {
  //     return res.status(400).json({ error: "reCAPTCHA verification failed." });
  //   }
  // } catch (error) {
  //   console.error("reCAPTCHA verification error:", error.message);
  //   return res.status(500).json({ error: "Failed to verify reCAPTCHA." });
  // }

  const emailRegex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  try {
    const existing = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    if (existing.rowCount > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3)",
      [email, passwordHash, fullName]
    );

    res.status(201).json({ message: "Registration successful." });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
