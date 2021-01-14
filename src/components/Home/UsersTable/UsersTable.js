import axios from 'axios';
import React, { useState } from 'react';
import { Button, Table } from 'reactstrap';
import Alert from '../../Common/Alert';


const UsersTable = ({ users }) => {
  const [isUerDeleted, setisUerDeleted] = useState(false);
  const buildTable = (users) => {
    return users.map((user, i) => (<tr key={user.id}>
      <th scope="row">{i}</th>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
      <td>{user.username}</td>
      <td>{user.birthday}</td>
      <td> {user.phone}</td>
      <td> {user.userLevel} </td>
      <td>{user.address}</td>
      <td>{user.profile}</td>
      <td>
        <div className="d-flex">
          <Button color="primary">Edit</Button>
          <Button color="danger" className="ml-3" onClick={() => deleteUser(user.id)}>Delete</Button>
        </div>
      </td>
    </tr>)
    )
  };

  const deleteUser = async (id) => {
    const { status } = await axios.delete(`users/${id}`);
    switch (status) {
      case 200:
        setisUerDeleted(true);
        break;
    }
  }

  return (
    <div>
      <Alert isOpen={isUerDeleted} message="User has been deleted" />
      <Table>
        <thead>
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
      </Table>
    </div>
  );
}

export default UsersTable;