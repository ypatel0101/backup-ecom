import express from "express";
import gamesRouter from "./games/games.js";
import usersRouter from "./users/users.js";
import cartRouter from "./cart/cart.js";
import { requireAdmin, requireUser } from "../utils.js";

const router = express.Router();

// `/api/v1`

// route to games endpoints
router.use("/games", gamesRouter);

// route to /users endpoint (only accessible by admins)
router.use("/users", requireAdmin, usersRouter);

// route to cart endpoint (only accessible by logged in user)
router.use("/cart", requireUser, cartRouter);

export default router;
