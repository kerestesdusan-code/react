require("dotenv").config(); //loading .env file
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 80;

const corsOptions = {
  origin: process.env.CORS_ORIGIN, // loading allowed origin from . env
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); //CORS setup
app.use(express.json()); //loading json body of request

//connection to couchDB(with env variables)
const couchdbConfig = {
  host: process.env.COUCHDB_HOST,
  port: process.env.COUCHDB_PORT,
  username: process.env.COUCHDB_USERNAME,
  password: process.env.COUCHDB_PASSWORD,
};

//API routes
app.use("/api", require("./routes/api"));

//serve static files(React build)
app.use(express.static(path.join(__dirname, "../build")));

//fallback route for React SPA
app.use(
  ["/", "/projects/*", "/about-me", "/contact-form"],
  cors(),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  }
);

//Server start
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "ALLREADY IN USE...") {
      console.error(`Port ${PORT} is already in use`);
    } else {
      console.error(err);
    }
  });
