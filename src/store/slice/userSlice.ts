import { createSlice } from '@reduxjs/toolkit';

const AUTH_INFO = 'auth';

export function getAuthFromLocalStorage() {
    try {
        const authData = localStorage.getItem(AUTH_INFO);
        return authData ? JSON.parse(authData) : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const initialState = {
    access: null,
    refresh: null,
    login: null,
    password: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState: getAuthFromLocalStorage() ?? initialState,
    reducers: {
        setAuth: (state, action) => {
            const {
                access,
                refresh,
                login,
                password
            } = action.payload ?? initialState;
            state.access = access;
            state.refresh = refresh;
            state.login = login;
            state.password = password;
            localStorage.setItem(AUTH_INFO, JSON.stringify(state));
        },
    },
});

export const { setAuth } = userSlice.actions;

export default userSlice.reducer;