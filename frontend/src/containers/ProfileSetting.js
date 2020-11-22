import React from "react";
import { connect } from "react-redux";
import EmailChange from "../components/EmailChange";
import PasswordChange from "../components/PasswordChange";
import UserDelete from "../components/UserDelete";
import UsernameChange from "../components/UsernameChange";

const ProfileSetting = ({ user }) => (
  <div className="container mt-5">
    <h1>Profile Settings</h1>
    <h3>UserName: {user ? user.username : null}</h3>
    <h3>Email: {user ? user.email : null}</h3>
    <EmailChange />
    <hr />
    <PasswordChange />
    <hr />
    <UsernameChange />
    <br />
    <br />
    <UserDelete />
  </div>
);

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ProfileSetting);
