import express from "express";
import { getAllGames, getSingleGame, createGame, updateGame, deleteGame } from "../../db/games.js";
import { requireUser } from "../../utils.js";

const router = express.Router();

// `/api/v1/games`

router.get(`/`, async (req, res) => {
	try {
		res.status(200).send(await getAllGames());
	} catch (error) {
		throw error;
	}
});

router.get(`/:id`, async (req, res) => {
	try {
		res.status(200).send(await getSingleGame(Number(req.params.id)));
	} catch (error) {
		throw error;
	}
});

//* Users must have a valid token to access information below this.

router.post(`/`, requireUser, async (req, res) => {
	const { name, developer, publisher, release_date, price, genre, is_multiplayer, stock, description, img_url, is_videogame, rec_players } = req.body;

	try {
		res
			.status(201)
			.send(
				await createGame(
					name,
					developer,
					publisher,
					release_date,
					price,
					genre,
					is_multiplayer,
					stock,
					description,
					img_url,
					is_videogame,
					rec_players,
				),
			);
	} catch (error) {
		throw error;
	}
});

router.put(`/:id`, requireUser, async (req, res) => {
	const { name, developer, publisher, release_date, price, genre, is_multiplayer, stock, description, img_url, is_videogame, rec_players } = req.body;

	try {
		res
			.status(200)
			.send(
				await updateGame(
					Number(req.params.id),
					name,
					developer,
					publisher,
					release_date,
					price,
					genre,
					is_multiplayer,
					stock,
					description,
					img_url,
					is_videogame,
					rec_players,
				),
			);
	} catch (error) {
		throw error;
	}
});

router.delete(`/:id`, requireUser, async (req, res) => {
	try {
		res.status(200).send(await deleteGame(Number(req.params.id)));
	} catch (error) {
		throw error;
	}
});

export default router;
