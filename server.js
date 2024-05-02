import "dotenv/config";
import express from "express";
const app = express();
const log = console.log;
import cors from "cors";

import apiRouter from "./api/api.js";

// import relative file location will have to be adjusted if auth.js moves directories
import authRouter from "./auth.js";

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _, next) => {
	log("<___BODY LOGGER START_____>");
	log(req.body);
	log("<___BODY LOGGER END_______>");
	next();
});

app.use(`/api`, apiRouter);

// for testing purposes of serving front-end
app.use(express.static("dist"));

// route to authentication
app.use("/auth", authRouter);

app.listen(process.env.PORT || 3000, () => {
	log("LISTENING ON PORT", process.env.PORT);
});

export default app;