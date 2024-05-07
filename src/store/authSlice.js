import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        token: null, //token set to null means users can't access certain areas on our web.
        errorMessage: '',
        userRole: '',
    },
    reducers: {
        setFirstName: (state, action) => {
            state.first_name = action.payload;
        },
        setLastName: (state, action) => {
            state.last_name = action.payload;
        },
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
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        },
      // clearAuth - This will clear up email/password if someone enters the wrong input, like incorrect password for an example.
        clearAuth: (state) => {
            state.email = '';
            state.password = '';
            state.token = null;
            state.errorMessage = '';
            state.userRole = '';
        },
        clearPassword: (state) => {
            state.password = '';
        },
        clearName: (state) => {
            state.first_name = '';
            state.last_name = '';
        }
    }
});

export const { 
    setFirstName, 
    setLastName, 
    setEmail, 
    setPassword, 
    setToken, 
    setErrorMessage, 
    clearAuth, 
    setUserRole,
    clearPassword,
    clearName,
} = authSlice.actions;
export default authSlice.reducer;