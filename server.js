import "dotenv/config";
import express from "express";
const app = express();
const log = console.log;
import cors from "cors";

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	log("<___BODY LOGGER START_____>");
	log(req.body);
	log("<___BODY LOGGER END_______>");
	next();
});

// for testing purposes of serving front-end
app.use(express.static("dist"));

app.listen(process.env.PORT || 3000, () => {
	log("LISTENING ON PORT", process.env.PORT);
});
