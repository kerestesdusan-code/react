const express = require("express");
const router = express.Router();
const nano = require("nano")("http://localhost:5984");

module.exports = router;
