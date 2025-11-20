require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

const db = require("./db");

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());


app.get("/api/db-test", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW() as now");
    res.json({ ok: true, now: result.rows[0].now });
  } catch (err) {
    console.error("DB test error:", err.message);
    res.status(500).json({ ok: false, error: "DB connection failed" });
  }
});

app.use("/api", require("./routes/api"));


app.use(express.static(path.join(__dirname, "../build")));

app.use(
  ["/", "/projects/*", "/about-me", "/contact-form"],
  (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  }
);

app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use`);
    } else {
      console.error(err);
    }
  });
