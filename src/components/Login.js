import React from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth.js';

const Login = (props) => {
    const [credentials, setCredentials] = React.useState({
        email: '',
        password: ''
    })

    const handleRoute = () => {
        props.handleSignInSignUp('signup')
    }
    const handleChange = (e) => {
        setCredentials(
            {
                ...credentials,
                [e.target.name]: e.target.value,
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!credentials.email || !credentials.password) {
        //     return;
        // }
        auth.authorize(credentials.email, credentials.password)
            .then((data) => {
                console.log(data)
                if (data.jwt) {
                    setCredentials({ email: '', password: '' }, () => {
                        props.handleLogin();
                        //props.history.push('/');
                    })
                }
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="login">
            <h2 className="login__title"> Log in</ h2>
            <form onSubmit={handleSubmit}>
                <input className="login__email" type="email" name="email" placeholder='Email' onChange={handleChange} />
                <input className="login__password" type="password" name="password" placeholder='Password' onChange={handleChange} />
                <button className="login__button" >Log in</button>
            </form>

            <p className="login__signin">Not a member yet? <Link to="signup" className="login__signin-link" onClick={handleRoute}>Sign up here!</Link></p>
        </div>
    )
}

export default Login
