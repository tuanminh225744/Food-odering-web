import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
        token: null,
    },
    reducers: {
        // Login
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailure: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        // Register
        registerStart: (state) => {
            state.register.isFetching = true;
            state.register.error = false;
            state.register.success = false;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.success = true;
            state.register.error = false;
        },
        registerFailure: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },

        // Token
        setToken: (state, action) => {
            state.token = action.payload;
        },
        removeToken: (state) => {
            state.token = null;
        },

        // Logout
        LOGOUT: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
        updateUserSuccess: (state, action) => {
            state.login.currentUser.others = {
                ...state.login.currentUser.others,
                ...action.payload
            };
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    setToken,
    removeToken,
    LOGOUT,
    updateUserSuccess
} = authSlice.actions;

export default authSlice.reducer;