import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import morgan from "morgan";
import cors from "cors";
import apiRouter from "./api/api.js";
import authRouter from "./auth/auth.js";
const log = console.log;

const app = express();

// various middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, _, next) => {
	log("<___BODY LOGGER START_____>");
	log(req.body);
	log("<___BODY LOGGER END_______>");
	next();
});

// Authorization middleware
app.use(async (req, _, next) => {
	const auth = req.headers.authorization;
	const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
	try {
		req.user = jwt.verify(token, process.env.SECRETKEY);
	} catch {
		req.user = null;
	}
	next();
});

// route to api
app.use(`/api`, apiRouter);

// route to authentication
app.use("/auth", authRouter);

// serving front-end for user
for (const path of ["/games/:id", "/admingames/:id", "/login", "/register", "/users", "/cart/confirmation", "/cart", "/"]) {
	app.use(path, express.static("dist"));
}

app.listen(process.env.PORT || 3000, () => {
	log("LISTENING ON PORT", process.env.PORT);
});

export default app;
