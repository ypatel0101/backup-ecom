import express from "express";
const router = express.Router();

// to be removed by person making the auth routes
router.get("/", (_, res) => {
	res.send("testing!");
});

export default router;
