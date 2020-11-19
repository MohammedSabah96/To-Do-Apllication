import axios from "axios";
import {
  EMAIL_CHANGE_SUCCESS,
  EMAIL_CHANGE_FAIL,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL,
  USERNAME_CHANGE_SUCCESS,
  USERNAME_CHANGE_FAIL,
  USER_DELETED_SUCCESS,
  USER_DELETED_FAIL,
} from "./types";
import { set_alert } from "./alert";

export const email_change = (
  new_email,
  re_new_email,
  current_password
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const body = JSON.stringify({ new_email, re_new_email, current_password });
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/set_email/`,
      body,
      config
    );
    dispatch({ type: EMAIL_CHANGE_SUCCESS });
    dispatch(set_alert("Email has been change successfully", "success"));
  } catch (err) {
    dispatch({ type: EMAIL_CHANGE_FAIL });
    dispatch(set_alert(err.response.data.new_email, "error"));
  }
};

export const password_change = (
  new_password,
  re_new_password,
  current_password
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const body = JSON.stringify({
    new_password,
    re_new_password,
    current_password,
  });
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/set_password/`,
      body,
      config
    );
    dispatch({ type: PASSWORD_CHANGE_SUCCESS });
    dispatch(set_alert("Password has been change successfully", "success"));
  } catch (err) {
    current_password = err.response.data.current_password;
    new_password = err.response.data.new_password;
    dispatch({ type: PASSWORD_CHANGE_FAIL });
    if (new_password) {
      dispatch(set_alert(new_password, "error"));
    } else {
      dispatch(set_alert(current_password, "error"));
    }
  }
};

export const username_change = (username) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  const body = JSON.stringify({ username });
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URL}/auth/users/me/`,
      body,
      config
    );
    dispatch({ type: USERNAME_CHANGE_SUCCESS, payload: res.data });
    dispatch(set_alert("Username has been changed successfully", "success"));
  } catch (err) {
    dispatch({ type: USERNAME_CHANGE_FAIL });
    dispatch(set_alert("Invalid Username", "error"));
  }
};

export const delete_user = (current_password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/auth/users/me/`,
      headers: config.headers,
      data: {
        current_password: current_password,
      },
    });
    dispatch({ type: USER_DELETED_SUCCESS });
    dispatch(set_alert("User has been deleted successfully", "success"));
    window.location = "/";
  } catch (err) {
    dispatch({ type: USER_DELETED_FAIL });
    dispatch(set_alert("Invalid Password", "error"));
  }
};
