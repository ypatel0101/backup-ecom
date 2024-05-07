import { createSlice } from "@reduxjs/toolkit";

const log = console.log;

const gamesSlice = createSlice({
	name: "games",
	initialState: {
		allGames: [],
		singleGame: {},
		editedGame: {},
		gameStateChange: false,
		errorMessage: ''
	},
	reducers: {
		setAllGames: (state, action) => {
				state.allGames = action.payload;
		},
		setSingleGame: (state, action) => {
				state.singleGame = action.payload
		},
		setGameStateChange: (state) => {
				state.gameStateChange = !state.gameStateChange
		},
		setEditedGame: (state, action) => {
			state.editedGame = action.payload
		},
		setErrorMessage: (state, action) => {
			state.errorMessage = action.payload
		}
	},
});

// these two exports are boilerplate syntax; not really sure how it works
export const { setAllGames, setErrorMessage, setSingleGame, setGameStateChange, setEditedGame } = gamesSlice.actions;

export default gamesSlice.reducer;
