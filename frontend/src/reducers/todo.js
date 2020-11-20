import {
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAIL,
  GET_TODO_SUCCESS,
  GET_TODO_FAIL,
} from "../actions/types";

const initialState = {
  title: null,
  description: null,
  important: false,
  complete: false,
  todos: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        title: payload.title,
        description: payload.description,
        important: payload.important,
        complete: payload.complete,
      };
    case CREATE_TODO_FAIL:
      return {
        ...state,
        title: null,
        description: null,
        important: false,
        complete: false,
      };
    case GET_TODO_SUCCESS:
      return {
        ...state,
        todos: payload,
      };
    case GET_TODO_FAIL:
      return {
        ...state,
        todos: null,
      };
    default:
      return state;
  }
}
