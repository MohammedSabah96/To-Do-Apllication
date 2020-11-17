import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";

const Login = ({ isAuthenticated, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  // Is the user authenticated?
  // Redirect them to home page.
  if (isAuthenticated) {
    Redirect("/");
  }
  return (
    <div className="container mt-5">
      <h1>Sign In</h1>
      <p>Sign Into your Account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
      <p className="mt-3">
        Don't have an Account? <Link to="/register">Register</Link>
      </p>
      <p className="mt-3">
        Forget Your Password? <Link to="/reset-password">Reset Password</Link>
      </p>
    </div>
  );

  // const mapStateToProps = (state) => ({
  //   isAuthenticated: state.isAuthenticated,
  // });
};

export default connect(null, { login })(Login);
