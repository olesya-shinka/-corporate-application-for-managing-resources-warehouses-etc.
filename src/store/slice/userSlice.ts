import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {
            login: '',
            password: '',
            token: null,
        },
        isLoggedIn: false,
    },
    reducers: {
        setToken(state, action) {
            //localStorage.getItem('accessToken');
            state.userInfo.token = action.payload;
            state.isLoggedIn = true;
        },
        setUserCredentials(state, action) {
            state.userInfo.login = action.payload.login;
            state.userInfo.password = action.payload.password;
        },
        removeUser(state) {
            state.userInfo.token = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setToken, setUserCredentials, removeUser } = userSlice.actions;
export default userSlice.reducer;