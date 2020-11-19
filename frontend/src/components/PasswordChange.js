import React, { useState } from "react";
import { connect } from "react-redux";
import { password_change } from "../actions/settings";
import { set_alert } from "../actions/alert";

const PasswordChange = ({ password_change, set_alert }) => {
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
    current_password: "",
  });
  const { new_password, re_new_password, current_password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (new_password === re_new_password) {
      password_change(new_password, re_new_password, current_password);
      setFormData({
        new_password: "",
        re_new_password: "",
        current_password: "",
      });
    } else {
      set_alert("Please enter same password", "error");
    }
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#passwordModal"
      >
        Change Password
      </button>
      <div className="modal fade" id="passwordModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change Password</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    name="new_password"
                    value={new_password}
                    onChange={(e) => onChange(e)}
                    minLength="8"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm New Password"
                    name="re_new_password"
                    value={re_new_password}
                    onChange={(e) => onChange(e)}
                    minLength="8"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    name="current_password"
                    value={current_password}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { password_change, set_alert })(PasswordChange);
