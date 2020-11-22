import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Alert from "./Alert";

const Navbar = ({ logout, isAuthenticated, user }) => {
  const location = useLocation();

  const guest_links = () => (
    <Fragment>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link
            id="login"
            className={`nav-link ${
              location.pathname === "/login" ? "active" : ""
            }`}
            to="/login"
          >
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link
            id="signup"
            className={`nav-link ${
              location.pathname === "/register" ? "active" : ""
            }`}
            to="/register"
          >
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
        <Link className="dropdown-item" to="/settings" role="button">
          Setting
        </Link>
        <button className="dropdown-item" onClick={logout} type="button">
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link id="todo" className="navbar-brand" to="/">
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
              <Link
                id="home"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            {isAuthenticated ? (
              <Fragment>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/create-todo" ? "active" : ""
                    }`}
                    to="/create-todo"
                  >
                    Create Todo
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/completed" ? "active" : ""
                    }`}
                    to="/completed"
                  >
                    Completed Todos
                  </Link>
                </li>
              </Fragment>
            ) : null}
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
