import prisma from "./../prisma/prisma.js";
import bcrypt from "bcrypt";

const log = console.log;

const register = async (newUser) => {
	try {
		const password = await bcrypt.hash(newUser.password, 10);
		const is_admin = false;
		const user = await prisma.users.create({
			data: {
				...newUser,
				password,
				is_admin,
			},
		});
		return user;
	} catch (err) {
		log(err);
	}
};

const findUserByID = async (id) => {
	try {
		const user = await prisma.users.findUnique({
			where: { id },
		});
		return user;
	} catch (err) {
		log(err);
	}
};

const findUserByEmail = async (email) => {
	try {
		const user = await prisma.users.findUnique({
			where: { email },
		});
		return user;
	} catch (err) {
		log(err);
	}
};

const getAllUsers = async () => {
	try {
		const users = await prisma.users.findMany();
		return users;
	} catch (err) {
		throw err;
	}
};

export { register, findUserByEmail, findUserByID, getAllUsers };
