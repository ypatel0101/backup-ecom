import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice.js";
import authReducer from "./authSlice.js";
import cartReducer from "./cartSlice.js";
import usersReducer from "./usersSlice.js";

const store = configureStore({
	reducer: {
		games: gamesReducer,
		auth: authReducer,
		cart: cartReducer,
		users: usersReducer,
	},
});

export default store;
