import express from "express";

const router = express.Router();

// to be removed by later person
router.get("/", (_, res) => res.send("testing /api/v1/games route!"));

export default router;
