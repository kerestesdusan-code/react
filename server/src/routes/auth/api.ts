import { Router } from "express";
import contactRouter from "./contact";
import registerRouter from "./register";
import loginRouter from "./login";
import usersRouter from "./users";

const router = Router();

router.use("/auth", contactRouter);
router.use("/auth", registerRouter);
router.use("/auth", loginRouter);
router.use("/users", usersRouter);

export default router;
