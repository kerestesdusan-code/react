const express = require("express");
const router = express.Router();

// Modularized routes with CORS
router.use("/auth", require("./auth/register"));
router.use("/auth", require("./auth/login"));
router.use("/users", require("./users/users"));

module.exports = router;
