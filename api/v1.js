import express from "express";
import gamesRouter from "./games/games.js";
import adminRouter from "./admin/admin.js";

const router = express.Router();

// `/api/v1`

router.get(`/`, (_, res) => res.send(`This works!!!`));

// route to games endpoints
router.use("/games", gamesRouter);

// route to /api/v1/admin
router.use("/admin", adminRouter);

export default router;
