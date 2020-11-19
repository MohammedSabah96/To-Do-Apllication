import React, { useState } from "react";
import { connect } from "react-redux";
import { email_change } from "../actions/settings";
import { set_alert } from "../actions/alert";

const EmailChange = ({ email_change, set_alert }) => {
  const [formData, setFormData] = useState({
    new_email: "",
    re_new_email: "",
    current_password: "",
  });
  const { new_email, re_new_email, current_password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (new_email === re_new_email) {
      email_change(new_email, re_new_email, current_password);
      setFormData({
        new_email: "",
        re_new_email: "",
        current_password: "",
      });
    } else {
      set_alert("Please enter same email", "error");
    }
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#emailModal"
      >
        Change Email
      </button>
      <div className="modal fade" id="emailModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change Email</h5>
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
                    type="email"
                    className="form-control"
                    placeholder="New Email"
                    name="new_email"
                    value={new_email}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Confirm New Email"
                    name="re_new_email"
                    value={re_new_email}
                    onChange={(e) => onChange(e)}
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

export default connect(null, { email_change, set_alert })(EmailChange);
