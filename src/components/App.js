import React, { useState } from "react";
//import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import Landingpage from "./Landingpage";
import * as auth from '../utils/auth.js';
import "../index.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [route, setRoute] = React.useState("signin");
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const handleSignInSignUp = (route) => {
    setRoute(route)
  }

  function handleInfoTooltip() {
    setInfoTooltipOpen(true);
  }
  function closeInfoPopup() {
    setInfoTooltipOpen(false);
  }

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      // we're checking the user's token
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true)
          //history.push("/");
        }
      });
    }
  }

  function handleLogin() {
    setLoggedIn(true)

  }

  function handleLogout() {
    setLoggedIn(false)
  }

  return (
    <>
      <Router>
        <div className="page">
          <Header handleSignInSignUp={handleSignInSignUp} loggedIn={loggedIn} route={route} />
        </div>
        <Switch>
          <Route path="/signin">
            <Login handleSignInSignUp={handleSignInSignUp} route={route} handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeInfoPopup} />
            <Register handleSignInSignUp={handleSignInSignUp} route={route} handleInfoTooltip={handleInfoTooltip} />
          </Route>
          <Route path="/cards">
            <Landingpage />
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn} component={Landingpage} />
          <Route exact path="/">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Redirect to="/signin" />
            )}
          </Route>
        </Switch>

      </Router>
    </>
  );
}

export default App;
