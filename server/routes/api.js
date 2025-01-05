const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth/contact"));
router.use("/auth", require("./auth/register"));
router.use("/auth", require("./auth/login"));
router.use("/users", require("./users/users"));

module.exports = router;
