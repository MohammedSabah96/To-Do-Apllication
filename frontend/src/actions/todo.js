import axios from "axios";
import {
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAIL,
  GET_TODO_SUCCESS,
  GET_TODO_FAIL,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  TODO_COMPLETED_SUCCESS,
  TODO_COMPLETED_FAIL,
} from "./types";
import { set_alert } from "./alert";

export const create_todo = (title, description, important) => async (
  dispatch
) => {
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  const body = JSON.stringify({ title, description, important });
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/home/todos/`,
      body,
      config
    );
    dispatch({ type: CREATE_TODO_SUCCESS });
    dispatch(set_alert("Your Task has been Created Successfully", "success"));
    dispatch(get_todos());
  } catch (err) {
    dispatch({ type: CREATE_TODO_FAIL });
    dispatch(set_alert("Your Task has not been Created", "error"));
  }
};

export const get_todos = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/home/todos/`,
      config
    );
    dispatch({
      type: GET_TODO_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: GET_TODO_FAIL });
    dispatch(
      set_alert("There are something wrong with getting all tasks.", "error")
    );
  }
};

export const delete_todo = (slug) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/home/todos/${slug}/`,
      config
    );
    dispatch({
      type: DELETE_TODO_SUCCESS,
      payload: slug,
    });
  } catch (err) {
    dispatch({ type: DELETE_TODO_FAIL });
    dispatch(
      set_alert("There are something wrong with delete this task!", "error")
    );
  }
};

export const complete_todo = (slug, complete) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  const body = JSON.stringify({ complete });
  try {
    await axios.patch(
      `${process.env.REACT_APP_API_URL}/home/todos/${slug}/`,
      body,
      config
    );
    dispatch({ type: TODO_COMPLETED_SUCCESS });
    dispatch(get_todos());
  } catch (err) {
    dispatch({ type: TODO_COMPLETED_FAIL });
    dispatch(
      set_alert("There are something wrong with complete this task!", "error")
    );
  }
};
