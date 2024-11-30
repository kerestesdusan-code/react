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

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const existingUser = await usersDb.find({ selector: { email } });
    if (existingUser.docs.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const response = await usersDb.insert({ email, password });
    res
      .status(201)
      .json({ message: "Registration successful", id: response.id });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
