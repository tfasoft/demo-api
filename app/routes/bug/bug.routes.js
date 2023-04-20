import express from "express";

import { Bug } from "$app/controllers/index.js";

const router = express.Router();

router.get("/", Bug.ALL);
router.post("/", Bug.CREATE);

export default router;
