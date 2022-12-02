import React, { useState, useEffect } from "react";
//import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import Landingpage from "./Landingpage";
import * as auth from '../utils/auth.js';
import "../index.css";

function App() {
  const history = useHistory()
  const [loggedIn, setLoggedIn] = useState(false);
  const [route, setRoute] = React.useState("signin");
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState(true)

  function handleEmail(m) {
    setEmail(m);
  }

  const handleSignInSignUp = (route) => {
    setRoute(route)
  }

  function handleInfoTooltip(x) {
    setInfoTooltipOpen(x);
  }
  function closeInfoPopup() {
    setInfoTooltipOpen(false);
  }


  function handleLogin() {
    setLoggedIn(true)
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setLoggedIn(false)
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      console.log('token :', token);
      // we're checking the user's token
      auth.checkToken(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push('/');
        }
      });
    }
  }, []);

  return (
    <>
      <Router>
        <div className="page">
          <Header
            email={email}
            handleSignInSignUp={handleSignInSignUp}
            loggedIn={loggedIn}
            handleLogout={handleLogout}
            route={route} />
        </div>
        <Switch>
          <Route path="/signin">
            <Login
              handleEmail={handleEmail}
              handleSignInSignUp={handleSignInSignUp}
              route={route}
              handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <InfoTooltip
              status={status}
              isOpen={isInfoTooltipOpen}
              onClose={closeInfoPopup} />
            <Register
              handleSignInSignUp={handleSignInSignUp}
              route={route}
              handleInfoTooltip={handleInfoTooltip}
              setStatus={setStatus} />
          </Route>
          <Route path="/cards">
            <Landingpage />
          </Route>
          <ProtectedRoute path="/"
            loggedIn={loggedIn}
            component={Landingpage} />
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
