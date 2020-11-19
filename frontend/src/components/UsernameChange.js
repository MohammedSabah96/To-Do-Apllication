import React, { useState } from "react";
import { connect } from "react-redux";
import { username_change } from "../actions/settings";

const UsernameChange = ({ username_change }) => {
  const [formData, setFormData] = useState({
    username: "",
  });
  const { username } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = () => {
    username_change(username);
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#usernameModal"
      >
        Change UserName
      </button>
      <div className="modal fade" id="usernameModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change UserName</h5>
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
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter New UserName"
                    name="username"
                    value={username}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { username_change })(UsernameChange);
