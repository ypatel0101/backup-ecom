import { createSlice } from "@reduxjs/toolkit";
import "dotenv/config";

const gamesSlice = createSlice({
	name: "games",
  // initial state is set to empty, just like React's useState is initially set to empty
	initialState: {
		allGames: [],
		singleGame: null,
	},
	reducers: {
    // we can never update state independently; we ALWAYS have to use the reducers to change state!
		setAllGames: async (state) => {
			try {
				// note; the endpoints these fetches go to don't exist yet.. more testing is needed when they come online
				const response = await fetch(API_URL + "/api/v1/games");
				state.allGames = await response.json();
			} catch (err) {
				throw err;
			}
		},
		setSingleGame: async (state, action) => {
			try { // action.payload should equal the game id to search as a string
				const response = await fetch(API_URL + "/api/v1/games/" + action.payload);
				state.singleGame = await response.json();
			} catch (err) {
				throw err;
			}
		},
	},
});

// these two exports are boilerplate syntax; not really sure how it works
export const { setAllGames, setSingleGame } = gamesSlice.actions;

export default gamesSlice.reducer;
