import React, { useState } from "react";
import { connect } from "react-redux";
import { delete_user } from "../actions/settings";

const UserDelete = ({ delete_user }) => {
  const [formData, setFormData] = useState({
    current_password: "",
  });
  const { current_password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    delete_user(current_password);
    setFormData({
      current_password: "",
    });
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-danger"
        data-toggle="modal"
        data-target="#deleteUserModal"
      >
        Delete User
      </button>
      <div className="modal fade" id="deleteUserModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete User</h5>
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
                    placeholder="Enter your password"
                    name="current_password"
                    value={current_password}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-danger btn-block">
                  Confirm Delete User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { delete_user })(UserDelete);
