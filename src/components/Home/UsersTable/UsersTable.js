import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Table } from 'reactstrap';
import { deleteUserAction } from '../../../app/usersSlice';
import Alert from '../../Common/Alert';
import Modal from '../../Common/Modal';


const UsersTable = ({ users, loggedUser }) => {
  const dispatch = useDispatch();

  const [showAlert, setshowAlert] = useState(false);
  const [toDeleteUserId, settoDeleteUserId] = useState(null);
  const [isOpenModal, setisOpenModal] = useState(false);
  const isUserLoggedAdmin = loggedUser.userLevel === 'Admin' ? true : false;
  const buildTable = (users) => {
    return users.map((user, i) => (<tr key={user.id}>
      <th scope="row">{i}</th>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
      <td>{user.username}</td>
      <td>{user.birthday}</td>
      <td>{user.phone}</td>
      <td>{user.userLevel}</td>
      <td>{user.address}</td>
      <td>{user.profile}</td>
      <td>
        <div className="d-flex">
          <Button disabled={!isUserLoggedAdmin} color="primary">Edit</Button>
          <Button disabled={!isUserLoggedAdmin} color="danger" className="ml-3" onClick={() => deleteButton(user.id)}>Delete</Button>
        </div>
      </td>
    </tr>)
    )
  };

  const deleteButton = (id) => {
    settoDeleteUserId(id);
    setisOpenModal(true);
  }

  const removeAlert = () => {
    setInterval(() => {
      setshowAlert(false);
    }, 2000);
  }

  const deleteUser = async (id) => {
    const { status } = await axios.delete(`users/${id}`);
    switch (status) {
      case 200:
        setshowAlert(true);
        setisOpenModal(false);
        removeAlert();
        dispatch(deleteUserAction({ userId: id }))
        break;
    }
  }

  return (
    <div>
      <Alert isOpen={showAlert} message="User has been deleted" />
      <table className="table table-striped table-hover">
        <thead>
          <tr><th colSpan="11" className="text-center"> Users Table </th></tr>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Birthday</th>
            <th>Phone</th>
            <th>UserLevel</th>
            <th>Address</th>
            <th>Profile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buildTable(users)}
        </tbody>
      </table>
      <Modal isOpen={isOpenModal} cancelCallBack={() => setisOpenModal(false)} confrimCallBack={() => deleteUser(toDeleteUserId)}></Modal>
    </div>
  );
}
export default UsersTable;
