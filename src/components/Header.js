import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";
import menu from "../images/hamburger-menu.svg";
import close from "../images/close-icon.svg";
import React from "react";
import Logout from "./Logout";

function Header(props) {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleOnClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className='header'>
        <div className='header__container'>
          <img src={logo} className='header__logo' alt='Around React' />
          <img
            src={`${isMenuOpen ? close : menu}`}
            className={`header__menu-button ${isMenuOpen &&
              "header_menu-button-hide"}`}
            alt='Open mobile menu'
            onClick={handleOnClick}
          />
        </div>
        <div className={`header__menu ${isMenuOpen && "header_menu-open"}`}>
          <p className={`header__email ${!props.userEmail && "hide"}`}>
            {props.userEmail}
          </p>
          {props.loggedIn ? (
            <Logout
              handleLogout={props.handleLogout}
              setUserEmail={props.setUserEmail}
            />
          ) : (
            <Link
              to={location.pathname === "/signin" ? "signup" : "signin"}
              className='header__button'
            >
              {location.pathname === "/signin" ? "Sign up" : "Sign in"}
            </Link>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
