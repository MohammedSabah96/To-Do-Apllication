import axios from "axios";
import { set_alert } from "./alert";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  LOGOUT,
} from "./types";

const { REACT_APP_API_URL } = process.env;

export const check_authenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ token: localStorage.getItem("access") });
    try {
      const res = await axios.post(
        `${REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );
      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${REACT_APP_API_URL}/auth/users/me/`,
        config
      );
      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      `${REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(set_alert("Authenticated Successfully", "success"));
    dispatch(load_user());
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
    dispatch(set_alert(err.response.data.detail, "error"));
  }
};

export const register = (username, email, password, re_password) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, email, password, re_password });
  try {
    const res = await axios.post(
      `${REACT_APP_API_URL}/auth/users/`,
      body,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(set_alert("Register Successfully", "success"));
  } catch (err) {
    email = err.response.data.email;
    password = err.response.data.password;
    dispatch({ type: REGISTER_FAIL });
    if (email) {
      dispatch(set_alert(email, "error"));
    }
    if (password) {
      dispatch(set_alert(password, "error"));
    }
  }
};

export const verify_activation = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid, token });
  try {
    await axios.post(
      `${REACT_APP_API_URL}/auth/users/activation/`,
      body,
      config
    );
    dispatch({ type: ACTIVATION_SUCCESS });
    dispatch(set_alert("Activation Successfully", "success"));
  } catch (err) {
    dispatch({ type: ACTIVATION_FAIL });
    dispatch(set_alert(err.response.data.detail, "error"));
  }
};

export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  try {
    await axios.post(
      `${REACT_APP_API_URL}/auth/users/reset_password/`,
      body,
      config
    );
    dispatch({ type: PASSWORD_RESET_SUCCESS });
    dispatch(set_alert("Request has been sent Successfully", "success"));
  } catch (err) {
    dispatch({ type: PASSWORD_RESET_FAIL });
    dispatch(set_alert(err.response.data.detail, "error"));
  }
};

export const reset_password_confirm = (
  uid,
  token,
  new_password,
  re_new_password
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid, token, new_password, re_new_password });
  try {
    await axios.post(
      `${REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
      body,
      config
    );
    dispatch({ type: PASSWORD_RESET_CONFIRM_SUCCESS });
    dispatch(set_alert("Password has been change Successfully", "success"));
  } catch (err) {
    dispatch({ type: PASSWORD_RESET_CONFIRM_FAIL });
    dispatch(set_alert(err.response.data.detail, "error"));
  }
};

export const logout = () => (dispatch) => {
  dispatch(set_alert("Logout Successfully", "success"));
  dispatch({ type: LOGOUT });
};
