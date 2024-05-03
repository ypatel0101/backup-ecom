import prisma from "../prisma/prisma.js";

const getAllGames = async () => {
	try {
		return await prisma.games.findMany();
	} catch (error) {
		throw error;
	}
};

const getSingleGame = async (id) => {
	try {
		return await prisma.games.findUnique({
			where: { id },
		});
	} catch (error) {
		throw error;
	}
};

const createGame = async (
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
) => {
	try {
		return await prisma.games.create({
			data: {
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
			},
		});
	} catch (error) {
		throw error;
	}
};

const updateGame = async (
	id,
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
) => {
	try {
		return await prisma.games.update({
			where: { id },
			data: {
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
			},
		});
	} catch (error) {
		throw error;
	}
};

const deleteGame = async (id) => {
	try {
		return await prisma.games.delete({
			where: { id },
		});
	} catch (error) {
		throw error;
	}
};

export { getAllGames, getSingleGame, createGame, updateGame, deleteGame };
