import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import Landingpage from "./Landingpage";
import * as auth from "../utils/auth.js";
import "../index.css";

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [regStatus, setRegStatus] = React.useState(true);

  function handleEmail(authStatus) {
    setUserEmail(authStatus);
  }

  function handleInfoTooltip(authStatus) {
    setInfoTooltipOpen(authStatus);
  }
  function closeInfoPopup() {
    setInfoTooltipOpen(false);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");

      // Checking the user's token
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            history.push("/");
          }
        })
        .catch((err) => console.log(`{'Something went wrong'}`));
    }
  }, []);

  return (
    <>
      <Header
        userEmail={userEmail}
        loggedIn={loggedIn}
        handleLogout={handleLogout}
        setUserEmail={setUserEmail}
      />
      <Switch>
        <Route path='/signin'>
          <Login
            handleEmail={handleEmail}
            handleLogin={handleLogin}
            handleInfoTooltip={handleInfoTooltip}
            setRegStatus={setRegStatus}
          />
        </Route>
        <Route path='/signup'>
          <Register
            handleEmail={handleEmail}
            handleLogin={handleLogin}
            handleInfoTooltip={handleInfoTooltip}
            setRegStatus={setRegStatus}
          />
        </Route>
        <ProtectedRoute path='/' loggedIn={loggedIn} component={Landingpage} />
        <Route exact path='/'>
          {loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' />}
        </Route>
      </Switch>
      <InfoTooltip
        regStatus={regStatus}
        isOpen={isInfoTooltipOpen}
        onClose={closeInfoPopup}
      />
    </>
  );
}

export default App;
