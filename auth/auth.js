import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import { register, findUserByEmail } from "../db/users.js";

const router = express.Router();

const log = console.log;

// register new user endpoint
router.post("/register", async (req, res) => {
	try {
		if (!authValidate(req.body)) {
			res.status(400).send({message: "Unsuccessful account creation."});
			return; // was having issues with multiple res.sends; returns will clear up the problem
		}
		if (await findUserByEmail(req.body.email)) {
			res.status(400).send({message: "Email already in use."});
			return;
		}
		const newUser = await register(req.body);
		if (!newUser) {
			res.status(400).send({message: "Unsuccessful account creation."});
			return;
		}
		req.user = newUser;
		const token = jwt.sign({ id: newUser.id, is_admin: newUser.is_admin, first_name: newUser.first_name, last_name: newUser.last_name }, process.env.SECRETKEY);
		res.status(201).send({ token });
	} catch (err) {
		log(err);
	}
});

// login existing user endpoint
router.post("/login", async (req, res) => {
	try {
		if (!authValidate(req.body, "🔐")) {
			res.status(401).send({message: "Error logging in."});
			return; // was having issues with multiple res.sends; returns will clear up the problem
		}
		const user = await findUserByEmail(req.body.email);
		if (!user) {
			res.status(401).send({ message: "Error logging in."});
			return;
		}
		const pwMatch = await bcrypt.compare(req.body.password, user.password);
		if (!pwMatch) {
			res.status(401).send({message: "Error logging in."});
			return;
		}
		req.user = user;
		const token = jwt.sign({ id: user.id, is_admin: user.is_admin, first_name: user.first_name, last_name: user.last_name }, process.env.SECRETKEY);
		const first_name = user.first_name;
		const last_name = user.last_name;
		res.status(201).send({ token, first_name, last_name });
	} catch (err) {
		log(err);
	}
});

router.get("/verify", async (req, res) => {
	try {
		if (req.user) {
			if (req.user.is_admin) res.send({role: "admin", first_name: req.user.first_name, last_name: req.user.last_name})
			else res.send({role: "user", first_name: req.user.first_name, last_name: req.user.last_name})
		} else {
			res.status(401).send({role: "nonuser"})
		}
	} catch(err) {
		throw err;
	}
})

// field validation registration util function for both register & login
const authValidate = (body, login) => {
	// field type validation
	let notString = false;
	Object.values(body).forEach((val) => {
		if (typeof val !== "string") notString = true;
	});
	if (notString) return false;
	// field validation
	const comparison = ["email", "password", "first_name", "last_name"];
	if (login) return JSON.stringify(Object.keys(body).sort()) === JSON.stringify(comparison.slice(0, 2));
	return JSON.stringify(Object.keys(body).sort()) === JSON.stringify(comparison.sort());
};

export default router;
