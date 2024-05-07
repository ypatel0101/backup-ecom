import express from "express";
import { getAllUsers } from "../../db/users.js";

const router = express.Router();

// api/v1/users

router.get("/", async (_, res) => {
	try {
		const users = await getAllUsers();
		res.status(201).send(users);
	} catch (err) {
		throw err;
	}
});

export default router;
