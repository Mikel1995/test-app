import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
import { selectLoggedUser } from '../../app/loggedUserSlice';


const NavBar = props => {
  const loggedUser = useSelector(selectLoggedUser);
  const [isOpen, setIsOpen] = useState(false);
  let history = useHistory();
  const toggle = () => setIsOpen(!isOpen);

  const logOut = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("username");
    // localStorage.removeItem("password");
    // localStorage.removeItem("rememberMe");
    history.push("/login");
  };

  const goToProfile = () => {
    const { user: {id} } = loggedUser;
    history.push(`/user/${id}`);
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/">Test App</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Name
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={()=>goToProfile()}>
                  Open Profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={()=>logOut()}>
                  Logout
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
