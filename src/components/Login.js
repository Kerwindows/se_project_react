import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';

const Login = (props) => {
    const history = useHistory()

    const handleRoute = () => {
        props.handleSignInSignUp('signup')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target[0].value
        const password = e.target[1].value

        if (!email || !password) {
            console.log('please fill out form')
            return;
        }
        auth.authorize(email, password)
            .then((data) => {
                if (data.token) {
                    props.handleLogin();
                    props.handleEmail(email);
                    history.push('/');
                }
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="login">
            <h2 className="login__title"> Log in</ h2>
            <form onSubmit={handleSubmit}>
                <input className="login__email" type="email" name="email" placeholder='Email' />
                <input className="login__password" type="password" name="password" placeholder='Password' />
                <button className="login__button" type="submit">Log in</button>
            </form>

            <p className="login__signin">Not a member yet? <Link to="signup" className="login__signin-link" onClick={handleRoute}>Sign up here!</Link></p>
        </div>
    )
}

export default Login
