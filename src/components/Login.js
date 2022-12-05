import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/auth.js";

const Login = ({
  handleLogin,
  handleEmail,
  setRegStatus,
  handleInfoTooltip,
}) => {
  const history = useHistory();
  const [credentialCheck, setCredentialCheck] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) {
      setCredentialCheck("All fields are required");
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setCredentialCheck("");
          handleLogin();
          handleEmail(email);
          history.push("/");
        }
      })
      .catch((err) => {
        setRegStatus(false);
        handleInfoTooltip(true);
        console.log(`{'error'}`);
      });
  };

  return (
    <div className='login'>
      <h2 className='login__title'> Log in</h2>
      <form onSubmit={handleSubmit}>
        <p className='login__error'>{credentialCheck}</p>
        <input
          className='login__email'
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='on'
        />
        <input
          className='login__password'
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='on'
        />
        <button className='login__button' type='submit'>
          Log in
        </button>
      </form>

      <p className='login__signin'>
        Not a member yet?{" "}
        <Link to='signup' className='login__signin-link'>
          Sign up here!
        </Link>
      </p>
    </div>
  );
};

export default Login;
