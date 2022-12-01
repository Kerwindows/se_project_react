import React from 'react';
import { Link } from 'react-router-dom';

const Register = (props) => {

    const handleRoute = () => {
        props.handleSignInSignUp('signin')
    }


    return (
        <div className="register">
            <h2 className="register__title"> Sign up</ h2>
            <form>
                <input className="register__email" type="email" placeholder='Email' />
                <input className="register__password" type="password" placeholder='Password' />
                <button className="register__button" >Log in</button>
            </form>

            <p className="register__signup" >Already a member?  <Link to="signin" className="register__signup-link" onClick={handleRoute}>Log in here!</Link></p>
        </div>
    )
}

export default Register
