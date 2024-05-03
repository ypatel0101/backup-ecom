import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice.js";
import authReducer from "./authSlice.js";

const store = configureStore({
	reducer: {
		games: gamesReducer,
		auth: authReducer,
	},
});

export default store;
