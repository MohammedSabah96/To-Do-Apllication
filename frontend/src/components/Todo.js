import React from "react";
import { connect } from "react-redux";
import { delete_todo, complete_todo } from "../actions/todo";
import $ from "jquery";

const Todo = ({ todo, delete_todo, complete_todo }) => {
  const handler = (slug) => {
    $(`#${slug}`).toggle();
  };
  return (
    <div>
      <div className={`todo ${todo.important ? "bg-danger" : ""}`}>
        <li
          onClick={() => handler(todo.slug)}
          className={`todo-item ${todo.complete ? "completed" : ""}`}
        >
          {todo.title}
        </li>
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
      <div
        id={todo.slug}
        className={`todo-item ${todo.complete ? "completed" : ""}`}
      >
        {todo.description}
      </div>
    </div>
  );
};

export default connect(null, { delete_todo, complete_todo })(Todo);
