import express from "express";

import { User } from "$app/controllers/index.js";

const router = express.Router();

router.get("/:id", User.SINGLE);
router.patch("/:id", User.UPDATE);
router.patch("/password/:id", User.PASSWORD);

export default router;
