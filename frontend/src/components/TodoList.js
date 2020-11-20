import React, { useEffect } from "react";
import { connect } from "react-redux";
import { get_todos } from "../actions/todo";
import Todo from "./Todo";

const TodoList = ({ get_todos }) => {
  useEffect(() => {
    get_todos();
  }, [get_todos]);
  return (
    <div className="todo-container">
      <ul className="todo-list">
        <Todo />
      </ul>
    </div>
  );
};

export default connect(null, { get_todos })(TodoList);
