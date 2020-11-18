import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Alert from "./Alert";
import $ from "jquery";
const Navbar = ({ logout, isAuthenticated, user }) => {
  useEffect(() => {
    var pathname = window.location.pathname;
    if (pathname === "/login") {
      $("#login").addClass("active");
    } else if (pathname === "/register") {
      $("#signup").addClass("active");
    } else {
      $("#home").addClass("active");
    }
  }, []);
  const guest_links = () => (
    <Fragment>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link id="login" className={`nav-link`} to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link id="signup" className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
      </ul>
    </Fragment>
  );
  const auth_links = () => (
    <div className="dropdown ml-auto">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenu2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {user ? user.username : null}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button className="dropdown-item" type="button">
          Setting
        </button>
        <button className="dropdown-item" onClick={logout} type="button">
          Logout
        </button>
      </div>
    </div>
  );
  $("ul li a").on("click", function () {
    $("li a").removeClass("active");
    $(this).addClass("active");
  });
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          ToDo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link id="home" className="nav-link" to="/">
                Home
              </Link>
            </li>
          </ul>
          {isAuthenticated ? auth_links() : guest_links()}
        </div>
      </nav>
      <Alert />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
