import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./routes/auth/api";

dotenv.config();

const app: Application = express();
<<<<<<< HEAD
app.set("trust proxy", 1);
const PORT = process.env.PORT || 5000;
=======
const PORT = process.env.PORT || 3001;
>>>>>>> 8622f51 (features: stable backend, groups, modified users, auth, jwt validation)

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "API is running" });
});

app.use("/api", apiRouter);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
