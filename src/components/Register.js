import React from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth.js';

const Register = (props) => {

    const [credentials, setCredentials] = React.useState({
        email: '',
        password: ''
    })

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

        const email = e.target[1].value
        const password = e.target[0].value

        if (!email || !password) {
            return;
        }
        auth.register(email, password).then((res) => {
            if (res.error) {
                console.log('res: ', res)
                props.setRegStatus(false)
                props.handleInfoTooltip(true)
            } else {
                props.setRegStatus(true)
                props.handleInfoTooltip(true)
            }
            setCredentials({
                email: '',
                password: ''
            })
        });
    }


    return (
        <div className="register">
            <h2 className="register__title"> Sign up</ h2>
            <form onSubmit={handleSubmit} name="Form">
                <input className="register__email" type="email" name="email" placeholder='Email' onChange={handleChange} value={credentials.email} />
                <input className="register__password" type="password" name="password" placeholder='Password' onChange={handleChange} value={credentials.password} />
                <button className="register__button" type="submit" >Sign up</button>
            </form>

            <p className="register__signup" >Already a member?  <Link to="signin" className="register__signup-link" >Log in here!</Link></p>
        </div>
    )
}

export default Register