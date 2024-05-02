import express from "express";
const router = express.Router();

// `/api`

import v1Router from "./v1.js";

router.use(`/v1`, v1Router);

export default router;
