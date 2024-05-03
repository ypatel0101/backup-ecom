import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
	// we can use this user state slice for multiple user states, including admin view of all users
	name: "users",
	initialState: {
		token: "",
	},
	reducers: {
		// upon registration or login, this reducer can set the token received to state
		getToken: (state, action) => {
			state.token = action.payload;
		},
		// upon logging out, this reducer can remove the token
		removeToken: (state) => {
			state.token = "";
		},
	},
});
// these two exports are boilerplate syntax; not really sure how it works
export const { getToken, removeToken } = usersSlice.actions;
export default usersSlice.reducer;
