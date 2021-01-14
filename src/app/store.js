import { configureStore } from '@reduxjs/toolkit';
import loggedUserReducer from './loggedUserSlice';
import usersReducer from './usersSlice';

export default configureStore({
  reducer: {
    loggedUser: loggedUserReducer,
    users: usersReducer
  },
});
