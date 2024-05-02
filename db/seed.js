import prisma from "../prisma/prisma.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import "dotenv/config";

const log = console.log;

// adjust the number of seed admins, users, games for sale, and carts in your .env file
const seedAdmins = process.env.seedAdmins * 1;
const seedUsers = process.env.seedUsers * 1;
const seedGames = process.env.seedGames * 1;
const seedCarts = process.env.seedCarts * 1;

const seed = async () => {
	try {
		log("seeding database...");

		log("adding seed admins...");
		const adminsToSeed = [];

		//hardcoded admins for testing
		adminsToSeed.push({
			first_name: "admin1",
			last_name: "admin1",
			email: "admin1@admin1",
			password: await bcrypt.hash("root", 8),
			is_admin: true,
		});
		adminsToSeed.push({
			first_name: "admin2",
			last_name: "admin2",
			email: "admin2@admin2",
			password: await bcrypt.hash("root", 8),
			is_admin: true,
		});
		adminsToSeed.push({
			first_name: "admin3",
			last_name: "admin3",
			email: "admin3@admin3",
			password: await bcrypt.hash("root", 8),
			is_admin: true,
		});

		//hardcoding users for testing
		adminsToSeed.push({
			// pushing to admins array as opposed to users array so the hardcoded users show up earlier in the db table
			first_name: "user1",
			last_name: "user1",
			email: "user1@user1",
			password: await bcrypt.hash("root", 8), // default password for hardcoded admins/users is 'root'
			is_admin: false,
		});
		adminsToSeed.push({
			first_name: "user2",
			last_name: "user2",
			email: "user2@user2",
			password: await bcrypt.hash("root", 8),
			is_admin: false,
		});
		adminsToSeed.push({
			first_name: "user3",
			last_name: "user3",
			email: "user3@user3",
			password: await bcrypt.hash("root", 8),
			is_admin: false,
		});
		// generating unique emails for seed admins and users
		const allEmails = ensureUnique(seedAdmins + seedUsers, faker.internet.email);
		// generating seed admins
		for (let i = 0; i < seedAdmins; i++) {
			adminsToSeed.push({
				first_name: faker.person.firstName(),
				last_name: faker.person.lastName(),
				email: allEmails[i],
				password: await bcrypt.hash(faker.internet.password(), 8),
				is_admin: true,
			});
		}

		log("adding seeded users...");
		const usersToSeed = [];
		// generating seed users
		for (let i = 0; i < seedUsers; i++) {
			usersToSeed.push({
				first_name: faker.person.firstName(),
				last_name: faker.person.lastName(),
				email: allEmails[i + seedAdmins], // as admins are a subset of users, to ensure unique emails we are generating
				// unique emails in one array to use in both our adminsToSeed array and usersToSeed array.
				password: await bcrypt.hash(faker.internet.password(), 8),
				is_admin: false,
			});
		}
		// push seed admins and users to db
		const numSeededUsers = await prisma.users.createMany({
			data: [...adminsToSeed, ...usersToSeed],
		});
		log("admins and users seeded!");

		log("seeding games for sale...");
		const gamesToSeed = [];
		// generating seed games
		const gameNames = ensureUnique(seedGames, () => faker.word.noun({ length: { min: 5, max: 30 } }));
		for (let i = 0; i < seedGames; i++) {
			gamesToSeed.push({
				name: gameNames[i],
				developer: faker.company.name(),
				publisher: faker.company.name(),
				release_date: faker.date.anytime(),
				price: faker.number.int({ min: 300, max: 50000 }),
				genre: faker.music.genre(),
				is_multiplayer: Math.random() > 0.5,
				stock: faker.number.int({ min: 0, max: 150 }),
				description: faker.lorem.paragraph({ min: 1, max: 10 }),
				img_url: faker.image.url(),
				is_videogame: Math.random() > 0.5,
				rec_players: Math.random() > 0.4 ? faker.number.int({ min: 1, max: 10 }) : null,
			});
		}
		// push seed games to db
		const numSeededGames = await prisma.games.createMany({
			data: gamesToSeed,
		});
		log("games seeded!");

		log("now seeding random carts...");
		const cartsToSeed = [];
		// generating seed carts
		for (let i = 0; i < seedCarts; i++) {
			cartsToSeed.push({
				user_id: Math.ceil(Math.random() * numSeededUsers.count), // we use Math.ceil because sql table IDs start at 1
				is_open: Math.random() > 0.8,
			});
			if (cartsToSeed[i].is_open) {
				if (cartsToSeed.slice(0, cartsToSeed.length - 1).includes(cartsToSeed[i])) {
					cartsToSeed.pop(); // these if statements are to ensure no one user has more than one open cart
					i--;
				}
			}
		}
		// push seed carts to db
		await prisma.cart.createMany({
			data: cartsToSeed,
		});
		log("carts seeded!");

		log("now seeding items in those random carts...");
		const gamesCartToSeed = [];
		// generating seed items in carts
		cartsToSeed.forEach((_, index) => {
			for (let i = 0; i < Math.floor(Math.random() * 15); i++) {
				gamesCartToSeed.push({
					game_id: Math.ceil(Math.random() * numSeededGames.count),
					cart_id: index + 1,
				});
			}
		});
		// push seed items in carts to db
		await prisma.cart_games.createMany({
			data: gamesCartToSeed,
		});
		log("random games seeded in carts!");

		log("finished seeding!!!");
	} catch (err) {
		log(err);
	}
};

// util function to help faker not have duplicates
// TODO: perhaps move this into a util.js?
const ensureUnique = (numToSeed, fakerMethod) => {
	const outputArray = [];
	while (numToSeed > outputArray.length) {
		const fakerOutput = fakerMethod();
		if (!outputArray.includes(fakerOutput)) {
			outputArray.push(fakerOutput);
		}
	}
	return outputArray;
};

seed()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		log(e);
		await prisma.$disconnect();
		process.exit(1);
	});
