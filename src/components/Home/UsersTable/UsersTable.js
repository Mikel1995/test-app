import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { deleteUserAction } from "../../../app/usersSlice";
import { revertValueAsync } from "../../../helpers";
import Alert from "../../Common/Alert";
import Modal from "../../Common/Modal";

const UsersTable = ({ users, loggedUser }) => {
  const dispatch = useDispatch();
  const [showAlert, setshowAlert] = useState(false);
  const [toDeleteUserId, settoDeleteUserId] = useState(null);
  const [isOpenModal, setisOpenModal] = useState(false);
  const isUserLoggedAdmin = loggedUser.userLevel === "Admin" ? true : false;
  const buildTable = users => {
    return users.map((user, i) =>
      <tr key={user.id}>
        <th scope="row">
          {i}
        </th>
        <td>
          {user.first_name}
        </td>
        <td>
          {user.last_name}
        </td>
        <td>
          {user.email}
        </td>
        <td>
          {user.username}
        </td>
        <td>
          {user.birthday}
        </td>
        <td>
          {user.phone}
        </td>
        <td>
          {user.userLevel}
        </td>
        <td>
          {user.address}
        </td>
        <td>
          <a href={user.profile}>Profile</a>
        </td>
        <td>
          <div className="d-flex">
            <Link to={`/user/${user.id}`}>
              {" "}<Button color="primary"  disabled={!isUserLoggedAdmin}>Edit</Button>
            </Link>
            <Button
              disabled={!isUserLoggedAdmin}
              color="danger"
              className="ml-3"
              onClick={() => deleteButton(user.id)}
            >
              Delete
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  const deleteButton = id => {
    settoDeleteUserId(id);
    setisOpenModal(true);
  };

  const deleteUser = async id => {
    const { status } = await axios.delete(`users/${id}`);
    switch (status) {
      case 200:
        setshowAlert(true);
        setisOpenModal(false);
        revertValueAsync(setshowAlert, 2);
        dispatch(deleteUserAction({ userId: id }));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Alert
        isOpen={showAlert}
        color="danger"
        message="User has been deleted"
      />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th colSpan="10" className="text-center">
              {" "}Users Table{" "}
            </th>
            <th><Link to="/add" style={{ textDecoration: 'none' }}><Button color="success" outline block> <AiOutlineUserAdd/>{"  "}Add</Button></Link></th>
          </tr>
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
      <Modal
        isOpen={isOpenModal}
        cancelCallBack={() => setisOpenModal(false)}
        confrimCallBack={() => deleteUser(toDeleteUserId)}
      />
    </>
  );
};
export default UsersTable;
