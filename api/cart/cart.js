import express from "express";
import { getOpenCartItems, createOpenCart, closeCart } from "./../../db/cart.js";

const router = express.Router();

// GET /api/v1/cart
router.get("/", async (req, res) => {
	try {
		// note; I am expecting there to be a req.user.id for me to use. If not, I will adjust.
		const openCart = await getOpenCartItems(req.user.id * 1);
		// (req.user.id * 1) must be type "number", and must be the logged in user's id
		if (openCart === "no cart") res.status(207).send({ message: "no cart" });
		else if (openCart === "empty cart") res.status(207).send({ message: "empty cart" });
		else res.status(201).send({ openCart });
		// Important note: openCart will be a JSON object containing one property:
		// "openCart", which is an array of game objects the user has in cart.
		// If admin has deleted a game while it is in a user's cart, it will appear
		// in this array as null.
	} catch (err) {
		throw err;
	}
});

// POST /api/v1/cart
router.post("/", async (req, res) => {
	try {
		const newOpenCart = await createOpenCart(req.user.id * 1);
		if (newOpenCart) res.status(201).send({ message: "success" });
		else res.status(500).send({ message: "fail" });
	} catch (err) {
		throw err;
	}
});

// POST /api/v1/cart/checkout
router.post("/checkout", async (req, res) => {
	try {
		const closedCart = await closeCart(req.user.id * 1);
		if (closedCart) {
			const newOpenCart = await createOpenCart(req.user.id * 1);
			if (newOpenCart) res.status(201).send({ message: "success" });
		} else res.status(500).send({ message: "fail" });
	} catch (err) {
		throw err;
	}
});

export default router;
