import React from "react";
import navbarItems from "../config/navbar";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/reducers/ui";

export default function Navbar(props) {

  const { isLoggedIn, userName, userRole } = useSelector((store) => store.ui);
  const toggleHamburger = () => {
    document.querySelector(".show-nav").classList.toggle("header__nav");
  };

  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('role')
    dispatch(logOut());
  }

  return (
    <>
      <header style={props.mode} className="header">
        <div className="header__container">
          <div className="header__wrapper-mobile">
            <div className="header__logo-wrapper">
              <Link className="header__logo-link" to="#">{props.appName}</Link>
            </div>

            <div className="header__hamburger-wrapper">
              <button className="hamburger-btn hamburger--collapse" id="hamburger" onClick={toggleHamburger} type="button">
                <div className="hamburger-box">
                  <div className="hamburger-inner"></div>
                  <div className="hamburger-inner"></div>
                  <div className="hamburger-inner"></div>
                </div>
              </button>
            </div>
          </div>

          <nav className="header__nav show-nav">
            <ul className="header__nav-list ">
              {navbarItems.map((val) => {
                return (
                  <>
                    <li className="header__nav-list-item">
                      <NavLink activeclassname={val.active ? 'is-active-link' : ''} exact="true" className="header__nav-link" to={val.path}>
                        {val.label}
                      </NavLink>
                    </li>
                  </>
                );
              })}
              <li style={{ display: isLoggedIn && userRole === 'hr' ? 'block' : 'none' }} className="header__nav-list-item">
                <NavLink exact="true" className="header__nav-link" to="/employees">
                  Employees
                </NavLink>
              </li>
              <li style={{ display: isLoggedIn && userRole === 'employee' ? 'block' : 'none' }} className="header__nav-list-item">
                <NavLink exact="true" className="header__nav-link" to="/my-info">
                  My Info
                </NavLink>
              </li>
              <li style={{ display: isLoggedIn ? 'none' : 'block', marginRight: '30px' }} className="header__nav-list-item">
                <NavLink exact="true" className="header__nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li style={{ display: isLoggedIn ? 'block' : 'none' }} className="header__nav-list-item">
                <span className="header__nav-link" >
                  Welcome {userName}
                </span>
              </li>
              <li style={{ display: isLoggedIn ? 'block' : 'none' }} onClick={logout} className="header__nav-list-item">
                <NavLink className="header__nav-link" to="/">
                  Logout
                </NavLink>
              </li>
              <li className="header__nav-list-item toggle-link ">
                <a className="header__nav-link" href="#">
                  <input onClick={props.toggleMode} className="toggle-mode" type="checkbox" id="checkbox1" />
                  <label className="toggle-mode-label" htmlFor="checkbox1"></label>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

Navbar.defaultProps = {
  appName: 'Leave Tracker'
}