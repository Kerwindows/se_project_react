import React, { useState, useEffect } from "react";
//import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
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

  function handleEmail(arg) {
    setUserEmail(arg);
  }

  function handleInfoTooltip(x) {
    setInfoTooltipOpen(x);
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

      // we're checking the user's token
      auth.checkToken(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push("/");
        }
      });
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
          <Login handleEmail={handleEmail} handleLogin={handleLogin} />
        </Route>
        <Route path='/signup'>
          <InfoTooltip
            regStatus={regStatus}
            isOpen={isInfoTooltipOpen}
            onClose={closeInfoPopup}
          />
          <Register
            handleInfoTooltip={handleInfoTooltip}
            setRegStatus={setRegStatus}
          />
        </Route>
        <Route path='/cards'>
          <Landingpage />
        </Route>
        <ProtectedRoute path='/' loggedIn={loggedIn} component={Landingpage} />
        <Route exact path='/'>
          {loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
