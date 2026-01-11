import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

import usersRouter from "./routes/auth/users";
import contactRouter from "./routes/auth/contact";
import loginRouter from "./routes/auth/login";
import registerRouter from "./routes/auth/register";

dotenv.config();

const app: Application = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "API is running" });
});

app.use("/api/users", usersRouter);

app.use("/api/auth", registerRouter);
app.use("/api/auth", loginRouter);
app.use("/api/auth", contactRouter);

app.use(
  (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
