import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const uid = match.params.uid;
    const token = match.params.token;
    reset_password_confirm(uid, token, new_password, re_new_password);
    setRequestSent(true);
  };

  if (requestSent) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container mt-5">
      <h1>Create New Password:</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="New Password"
            type="password"
            name="new_password"
            value={new_password}
            onChange={(e) => onChange(e)}
            minLength='8'
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Confirm New Password"
            type="password"
            name="re_new_password"
            value={re_new_password}
            onChange={(e) => onChange(e)}
            minLength='8'
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
