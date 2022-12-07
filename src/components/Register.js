import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/auth.js";

const Register = ({ setRegStatus, handleInfoTooltip }) => {
  const history = useHistory();

  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) {
      return;
    }

    auth
      .register(password, email)
      .then((res) => {
        setRegStatus(true);
        handleInfoTooltip(true);
        history.push("/");
        setCredentials({
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        setRegStatus(false);
        handleInfoTooltip(true);
        console.log(err);
      });
  };

  return (
    <div className='register'>
      <h2 className='register__title'> Sign up</h2>
      <form onSubmit={handleSubmit} name='Form'>
        <input
          className='register__email'
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          value={credentials.email}
          autoComplete='on'
        />
        <input
          className='register__password'
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
          value={credentials.password}
          autoComplete='on'
        />
        <button className='register__button' type='submit'>
          Sign up
        </button>
      </form>

      <p className='register__signup'>
        Already a member?{" "}
        <Link to='signin' className='register__signup-link'>
          Log in here!
        </Link>
      </p>
    </div>
  );
};

export default Register;
