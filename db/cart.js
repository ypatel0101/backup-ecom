import prisma from "./../prisma/prisma.js";

const getOpenCart = async (user_id) => {
	try {
		const is_open = true;
		const openCart = await prisma.cart.findFirst({
			where: {
				user_id,
				is_open,
			},
			select: { id: true },
		});
		return openCart?.id;
	} catch (err) {
		throw err;
	}
};

const getOpenCartItems = async (user_id) => {
	try {
		const openCartId = await getOpenCart(user_id);
		if (!openCartId) return "no cart"; // edited to differentiate between no cart and empty cart
		const cartGameIds = await prisma.cart_games.findMany({
			where: { cart_id: openCartId },
			select: { game_id: true },
		});
		if (!cartGameIds.length) return "empty cart"; // edited to differentiate between no cart and empty cart
		const cartGames = [];
		for (let i = 0; i < cartGameIds.length; i++) {
			cartGames.push(
				await prisma.games.findFirst({
					where: { id: cartGameIds[i].game_id },
				}),
			);
		}
		return cartGames;
	} catch (err) {
		throw err;
	}
};

const createOpenCart = async (user_id) => {
	try {
		const is_open = true;
		const newOpenCart = await prisma.cart.create({
			data: {
				user_id,
				is_open
			}
		});
		return newOpenCart;
	} catch(err) {
		throw err;
	}
}

const closeCart = async (user_id) => {
	try { // update has to search unique, so we can use updateMany as a workaround
		const closedCart = await prisma.cart.updateMany({
			where: {
				user_id,
				is_open: true,
			},
			data: {
				is_open: false,
			}
		});
		return closedCart;
	} catch(err) {
		throw err;
	}
}

export { getOpenCartItems, createOpenCart, closeCart };
