import React from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth.js';

const Register = (props) => {

    const [credentials, setCredentials] = React.useState({
        email: '',
        password: ''
    })
    const handleRoute = () => {
        props.handleSignInSignUp('signin')
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
        if (!credentials.email || !credentials.password) {
            return;
        }
        auth.register(credentials.email, credentials.password).then((res) => {
            if (res) {
                //props.history.push('/login');
            } else {
                console.log('Something went wrong.');
                props.handleInfoTooltip()
            }
        });
    }


    return (
        <div className="register">
            <h2 className="register__title"> Sign up</ h2>
            <form onSubmit={handleSubmit}>
                <input className="register__email" type="email" name="email" placeholder='Email' onChange={handleChange} />
                <input className="register__password" type="password" name="password" placeholder='Password' onChange={handleChange} />
                <button className="register__button" type="submit" >Sign up</button>
            </form>

            <p className="register__signup" >Already a member?  <Link to="signin" className="register__signup-link" onClick={handleRoute}>Log in here!</Link></p>
        </div>
    )
}

export default Register
