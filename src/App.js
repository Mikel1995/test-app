import React from 'react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import ViewEdit from './components/Home/UsersTable/ViewEdit';
import NavBar from './components/Common/Navbar';
import { Container } from 'reactstrap';

function App() {

  const NavRoute = ({exact, path, component: Component}) => (
    <Route exact={exact} path={path} render={(props) => (
      <div>
        <NavBar/>
        <Component {...props}/>
      </div>
    )}/>
  )

  return (
    <div className="container-fluid">
      <Container>
      <Switch>
        <NavRoute path="/" exact={true} component={Home} />
        <Route path="/login" component={Login} />
         
        <NavRoute path="/user/:id" component={ViewEdit} />
      </Switch>
      </Container>
    </div>
  );
}
export default withRouter(App);

