import {
  EMAIL_CHANGE_SUCCESS,
  EMAIL_CHANGE_FAIL,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL,
  USERNAME_CHANGE_SUCCESS,
  USERNAME_CHANGE_FAIL,
  USER_DELETED_SUCCESS,
  USER_DELETED_FAIL,
} from "../actions/types";

const initialState = {
  username: null,
  email: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USERNAME_CHANGE_SUCCESS:
      return {
        ...state,
        username: payload.username,
        email: payload.email,
      };
    case USERNAME_CHANGE_FAIL:
    case EMAIL_CHANGE_SUCCESS:
    case EMAIL_CHANGE_FAIL:
    case PASSWORD_CHANGE_SUCCESS:
    case PASSWORD_CHANGE_FAIL:
    case USER_DELETED_SUCCESS:
    case USER_DELETED_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
