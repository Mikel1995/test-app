import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { deleteUserAction } from "../../../app/usersSlice";
import { revertValueAsync } from "../../../helpers";
import Alert from "../../Common/Alert";
import Modal from "../../Common/Modal";
import Search from "../../Common/Search";

const UsersTable = ({ users, loggedUser }) => {
  const dispatch = useDispatch();
  const [usersList, setusersList] = useState(users);
  const [showAlert, setshowAlert] = useState(false);
  const [toDeleteUserId, settoDeleteUserId] = useState(null);
  const [isOpenModal, setisOpenModal] = useState(false);
  const isUserLoggedAdmin = loggedUser?.userLevel === "Admin" ? true : false;
 
  const deleteButton = id => {
    settoDeleteUserId(id);
    setisOpenModal(true);
  };

  const searchUser = (searchTerm)=> {
    const filteredUsers = users.filter(user=>(user.first_name.includes(searchTerm) || user.last_name.includes(searchTerm) || user.username.includes(searchTerm)));
    setusersList(filteredUsers);
  }

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

  useEffect(() => {
    setusersList(users);
  }, [users])

  const buildTable = () => {
    return usersList.map((user, i) =>
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
        <img style={{width:'40px', height:'40px'}}  src={user.photo} alt=""></img>
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

  return (
    <>
      <Alert
        isOpen={showAlert}
        color="danger"
        message="User has been deleted"
      />
      <table className="table table-sm table-striped table-hover">
        <thead>
          <tr>
            <th colSpan="8" className="text-center">
              {" "}Users Table{" "}
            </th>
            <th colSpan="3"><Search callBack={searchUser} /> </th>
            <th><Link to="/add" style={{ textDecoration: 'none' }}><Button disabled={!isUserLoggedAdmin} color="success" outline block> <AiOutlineUserAdd/>{"  "}Add</Button></Link></th>
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
            <th>Photo</th>
            <th>Profile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buildTable()}
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
