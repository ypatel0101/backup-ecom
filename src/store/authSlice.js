import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email: '',
        password: '',
        token: null, //token set to null means users can't access certain areas on our web.
        errorMessage: '',
    },
    reducers: {
    
        setEmail: (state, action) => {
        state.email = action.payload;
    },
        setPassword: (state, action) => {
  	    state.password = action.payload;
    },
        setToken: (state, action) => {
        state.token = action.payload;
    },
      setErrorMessage: (state, action) => {
        state.errorMessage = action.payload;
      },

      // clearAuth - This will clear up email/password if someone enters the wrong input, like incorrect password for an example.
      clearAuth: (state) => {
            state.email = '';
            state.password = '';
            state.token = null;
            state.errorMessage = '';
      }
    }
});

export const { setEmail, setPassword, setToken, setErrorMessage, clearAuth} = authSlice.actions;
export default authSlice.reducer;