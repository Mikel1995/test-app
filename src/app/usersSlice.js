import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: []
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload || []
        },
        deleteUserAction: (state, action) => {
            const userId = action.payload.userId;
            console.log(userId);
            const users = [...state.users];
            console.log(users);

            const test = users.filter(user => user.id !== userId);
            console.log(test);
            state.users = users.filter(user => user.id !== userId);
        }
    }
});



export const { setUsers, deleteUserAction } = usersSlice.actions;


export const selectUsers = state => state.users.users;

export default usersSlice.reducer;