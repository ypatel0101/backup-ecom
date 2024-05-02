import "dotenv/config";
import express from "express";
const app = express();
const log = console.log;

//Body-Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	log("<___BODY LOGGER START_____>");
	log(req.body);
	log("<___BODY LOGGER END_______>");
	next();
});

app.listen(process.env.PORT || 3000, () => {
	log("LISTENING ON PORT", process.env.PORT);
});
