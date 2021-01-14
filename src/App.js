import React from 'react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import {
  Switch,
  Route,
  withRouter,
  browserHistory 
} from "react-router-dom";

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}
export default withRouter(App);

