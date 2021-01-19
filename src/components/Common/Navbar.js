import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { AiOutlineLogout } from "react-icons/ai";
import { selectLoggedUser } from '../../app/loggedUserSlice';

const NavBar = props => {
  const loggedUser = useSelector(selectLoggedUser).user || JSON.parse(localStorage.getItem('user'));
  const [isOpen, setIsOpen] = useState(false);
  let history = useHistory();
  const toggle = () => setIsOpen(!isOpen);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/login");
  };

  const goToProfile = () => {
    history.push("/profile");
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/"><NavLink to="/">Test App</NavLink></Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {loggedUser?.first_name}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={()=>goToProfile()}>
                  Open Profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={()=>logOut()}>
                <AiOutlineLogout /> Logout 
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
