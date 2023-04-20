import express from "express";

import User from "$app/routes/user/user.routes.js";
import Auth from "$app/routes/auth/auth.routes.js";
import Bug from "$app/routes/bug/bug.routes.js";

const router = express.Router();

import { jwt } from "$app/middlewares/index.js";

router.use("/users", jwt, User);
router.use("/bugs", Bug);
router.use("/auth", Auth);

export default router;
