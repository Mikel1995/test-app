import { createSlice } from '@reduxjs/toolkit';

export const loggedUserSlice = createSlice({
    name: 'loggedUser',
    initialState: {
        user: null,
        isLogged: false
    },
    reducers: {
        setLoggedUser: (state, action) => {
            state.user = action.payload.user 
            state.isLogged = action.payload.islogged || false
        }
    }
});

export const { setLoggedUser } = loggedUserSlice.actions;

export const selectLoggedUser = state => state.loggedUser ;

export default loggedUserSlice.reducer;