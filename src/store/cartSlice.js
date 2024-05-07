import { createSlice } from "@reduxjs/toolkit";

const log = console.log;

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		openCart: [],
    checkoutStatus: false,
	},
	reducers: {
		setOpenCart: (state, action) => {
				state.openCart = action.payload;
		},
		addCartGame: (state, action) => {
				state.openCart.push(action.payload);
		},
    deleteCartGame: (state, action) => {
      const index = state.openCart.findIndex((cartGame) => {
        return cartGame.id === action.payload.id
      })
      state.openCart.splice(index, 1);
    },
    setCheckoutStatus: (state, action) => {
      state.checkoutActive = action.payload;
    }
	},
});

// these two exports are boilerplate syntax; not really sure how it works
export const { setOpenCart, addCartGame, deleteCartGame, setCheckoutStatus } = cartSlice.actions;

export default cartSlice.reducer;