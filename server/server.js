const express = require("express");
const path = require("path");
const app = express();
var cors = require("cors");
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use("/api", require("./routes/api"));

app.use(express.static("../build"));
app.use(
  ["/", "/projects/*", "/about-me", "/contact-form"],
  cors(),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  }
);

app
  .listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use`);
    } else {
      console.error(err);
    }
  });
