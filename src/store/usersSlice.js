import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
	name: "users",
	initialState: {
		allUsers: []
	},
	reducers: {
		setAllUsers: (state, action) => {
			state.allUsers = action.payload;
		},
	},
});
// these two exports are boilerplate syntax; not really sure how it works
export const { setAllUsers } = usersSlice.actions;
export default usersSlice.reducer;
