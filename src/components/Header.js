
import { Link } from 'react-router-dom';
import logo from "../images/logo.svg";
import menu from "../images/hamburger-menu-svg-2.svg";
import close from "../images/close-icon.svg";
import React from "react";

function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);



  const handleRoute = () => {
    if (props.route === 'signin') {
      props.handleSignInSignUp('signup')

    } else if (props.route === 'signup') {
      props.handleSignInSignUp('signin')
    }

  }

  const handleOnClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <header className="header">
        <div className="header__container">
          <img src={logo} className="header__logo" alt="Around React" />
          <img src={`${isMenuOpen ? close : menu}`} className={`header__menu-button ${isMenuOpen && "header_menu-button-hide"}`} alt="Open mobile menu" onClick={handleOnClick} />
        </div>
        <div className={`header__menu ${isMenuOpen && "header_menu-open"}`}>
          <p className="header__email">{"email@mail.com"}</p>
          <Link to={props.route === "logout" ? 'signin' : props.route === "signin" ? 'signup' : 'signin'} onClick={handleRoute} className="header__button">
            {props.route === "logout" ? 'Log out' : props.route === "signin" ? 'Sign up' : 'Sign in'}
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
