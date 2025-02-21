const express = require("express");
require("dotenv").config();
const router = express.Router();
const nano = require("nano")(process.env.COUCHDB_URL);
const axios = require("axios");
const cors = require("cors");
const usersDb = nano.db.use("users");

router.post("/login", async (req, res) => {
  const { email, password, fullName, recaptchaToken } = req.body;

  if (!email || !password || !fullName || !recaptchaToken) {
    return res
      .status(400)
      .json({ error: "All fields, including reCAPTCHA, are required." });
  }

  try {
    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const recaptchaResponse = await axios.post(recaptchaVerifyUrl, null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      },
    });

    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ error: "reCAPTCHA verification failed." });
    }

    const userResult = await usersDb.find({ selector: { email } });

    if (userResult.docs.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = userResult.docs[0];

    if (password !== user.password) {
      return res.status(401).json({ error: "Incorrect login details." });
    }

    const token = `${email}:${fullName}`;

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
