import { Router } from "express";

import contactRouter from "./contact";
import registerRouter from "./register";
import loginRouter from "./login";
import meRouter from "./me";

import usersRouter from "./users";
import groupRouter from "./group";
import verifyRouter from "./verify";

const router = Router();

router.use("/auth", contactRouter);
router.use("/auth", registerRouter);
router.use("/auth", loginRouter);
router.use("/auth", meRouter);

router.use("/user", usersRouter);

router.use("/group", groupRouter);
router.use("/auth", verifyRouter);

export default router;
