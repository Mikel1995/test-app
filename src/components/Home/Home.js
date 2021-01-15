import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Jumbotron } from 'reactstrap';
import { withRouter } from "react-router-dom";
import { selectLoggedUser, setLoggedUser } from '../../app/loggedUserSlice';
import { selectUsers, setUsers } from '../../app/usersSlice';

import UsersTable from './UsersTable/UsersTable'
import axios from 'axios';
import NavBar from '../Common/Navbar';

const Home = (props) => {
  const users = useSelector(selectUsers);
  const loggedUser = useSelector(selectLoggedUser);
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
    getUsers();
  }, [])


  console.log(loggedUser);

  return (
    <div >
      <Container>
        <NavBar />
        <UsersTable users={users} loggedUser={loggedUser.user !== null ? loggedUser.user : {}} />
      </Container>
    </div>
  );
};

export default withRouter(Home)