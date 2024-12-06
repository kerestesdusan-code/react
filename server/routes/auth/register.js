const express = require("express");
const router = express.Router();
const nano = require("nano")("http://admin:123@127.0.0.1:5984");
const cors = require("cors");

const usersDb = nano.db.use("users");

router.post("/register", async (req, res) => {
  console.log("Incomming request body:", req.body);

  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res
      .status(400)
      .json({ error: "Email, Full name and password are required" });
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const existingUser = await usersDb.find({ selector: { email } });

    if (existingUser.docs.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = { email, password, fullName };
    const result = await usersDb.insert(newUser);

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
