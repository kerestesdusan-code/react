const express = require("express");
const router = express.Router();
const nano = require("nano")("http://admin:123@127.0.0.1:5984"); // Nano for CouchDB
const cors = require("cors"); // Middleware to handle CORS (Cross-Origin Resource Sharing)
require("./root"); // Includes additional settings or logic from root.js

// Use the "users" database
const usersDb = nano.db.use("users");

// Middleware for input validation
function validateUser(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }
  next();
}

// CORS configuration specific to this router
const corsOptions = {
  origin: "http://localhost:3000", // Allow only your frontend
  methods: "GET,POST", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

// Apply CORS middleware to the router
router.use(cors(corsOptions)); // Ensures that all endpoints in this router have CORS enabled

// Endpoint for user registration
router.post("/register", validateUser, async (req, res) => {
  const { email, password } = req.body;

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

// Endpoint for user login
router.post("/login", validateUser, async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await usersDb.find({ selector: { email } });
    if (userResult.docs.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = userResult.docs[0];

    if (password !== user.password) {
      return res
        .status(401)
        .json({ error: "Incorrect login details, please try again" });
    }

    const token = email;
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to retrieve the list of users
router.get("/users", async (req, res) => {
  try {
    const userList = await usersDb.list({ include_docs: true }); // Fetch all documents
    const users = userList.rows.map((row) => row.doc); // Extract the document data
    res.json(users); // Return the users as a JSON response
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

module.exports = router;
