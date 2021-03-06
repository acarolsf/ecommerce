import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import "./styles.scss";
import logo from "./../../assets/logo.png";
import { signOutUserStart } from "../../redux/user/user.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumberCartItems: selectCartItemsCount(state)
});

const Header = props => {
  const dispatch = useDispatch();
  const { currentUser, totalNumberCartItems } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Ana Carolina logo" />
          </Link>
        </div>

        <nav>
          <ul>
          <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <div className="callToActions">

          <ul>

            <li>
              <Link to="/cart">
                Your Cart({totalNumberCartItems})
              </Link>
            </li>
            
          {currentUser && [
              <li>
                <Link to="/dashboard">My Account</Link>
              </li>,
              <li>
                <span onClick={() => signOut()}>
                    Logout
                </span>
              </li>
          ]}


          {!currentUser && [
              <li>
                <Link to="/register">Register</Link>
              </li>,

              <li>
                <Link to="/login">Login</Link>
              </li>
          ]}
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
