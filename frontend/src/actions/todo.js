import axios from "axios";
import {
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAIL,
  GET_TODO_SUCCESS,
  GET_TODO_FAIL,
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
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/home/todos/`,
      body,
      config
    );
    dispatch({
      type: CREATE_TODO_SUCCESS,
      payload: res.data,
    });
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
