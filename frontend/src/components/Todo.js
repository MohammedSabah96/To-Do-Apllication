import React from "react";
import { connect } from "react-redux";
import { delete_todo, complete_todo } from "../actions/todo";

const Todo = ({ todo, delete_todo, complete_todo }) => {
  return (
    <div>
      <div className={`todo ${todo.important ? "bg-danger" : ""}`}>
        <li className={`todo-item ${todo.complete ? "completed" : ""}`}>
          {todo.title}
        </li>
        {todo.completed_date !== null ? (
          <div className="text-black-50">
            {todo.completed_date.slice(0, 10)},{" "}
            {todo.completed_date.slice(11, 16)}
          </div>
        ) : null}
        <button
          onClick={() => complete_todo(todo.slug, !todo.complete)}
          className="complete-btn"
        >
          <i className="fas fa-check"></i>
        </button>
        <button onClick={() => delete_todo(todo.slug)} className="trash-btn">
          <i className="fas fa-trash"></i>
        </button>
      </div>
      <div className={`todo-item ${todo.complete ? "completed" : ""}`}>
        {todo.description}
      </div>
    </div>
  );
};

export default connect(null, { delete_todo, complete_todo })(Todo);
