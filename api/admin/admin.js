import express from "express";
const router = express.Router();

// to be removed by person implementing /admin endpoints
router.get("/", (_, res) => res.send("/api/v1/admin works!!!"));

export default router;
