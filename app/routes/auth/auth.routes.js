import express from "express";

import { Auth } from "$app/controllers/index.js";

const router = express.Router();

router.post("/login", Auth.LOGIN);
router.post("/register", Auth.REGISTER);
router.get("/request", Auth.TELEGRAM_REQUEST);
router.post("/telegram", Auth.TELEGRAM_AUTH);

export default router;
