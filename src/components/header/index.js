import React from "react";
import { Link } from "react-router-dom";
import { auth } from './../../firebase/utils';
import "./styles.scss";
import logo from "./../../assets/logo.png";

const Header = (props) => {
  const { currentUser } = props;

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Ana Carolina logo" />
          </Link>
        </div>

        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <span>{currentUser.displayName}</span>
              </li>
              <li>
                <span onClick={() => auth.signOut()}>
                    Logout
                </span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/register">Register</Link>
              </li>

              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
