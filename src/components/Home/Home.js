import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { selectLoggedUser } from '../../app/loggedUserSlice';
import { selectUsers, setUsers } from '../../app/usersSlice';

import UsersTable from './UsersTable/UsersTable'
import axios from 'axios';

const Home = () => {
  let history = useHistory();
  const users = useSelector(selectUsers);
  const loggedUser = useSelector(selectLoggedUser).user || JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  const getUsers = async () => {
    const { data, status } = await axios.get('users');
    switch (status) {
      case 200:
        dispatch(setUsers(data))
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/login')
    }
    getUsers();
  }, [])

  return (
    <>
        <UsersTable users={users} loggedUser={loggedUser} />
    </>
  );
};

export default Home;