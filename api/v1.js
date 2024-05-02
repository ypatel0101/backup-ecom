import express from "express";
const router = express.Router();

// `/api/v1`

router.get(`/`, (req, res) => res.send(`This works!!!`));

export default router;
