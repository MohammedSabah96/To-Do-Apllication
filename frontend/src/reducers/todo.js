import {
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAIL,
  GET_TODO_SUCCESS,
  GET_TODO_FAIL,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  TODO_COMPLETED_SUCCESS,
  TODO_COMPLETED_FAIL,
} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TODO_SUCCESS:
      return payload;
    case DELETE_TODO_SUCCESS:
      return state.filter((todo) => todo.slug !== payload);
    case CREATE_TODO_SUCCESS:
    case TODO_COMPLETED_SUCCESS:
    case TODO_COMPLETED_FAIL:
    case CREATE_TODO_FAIL:
    case GET_TODO_FAIL:
    case DELETE_TODO_FAIL:
    default:
      return state;
  }
}
