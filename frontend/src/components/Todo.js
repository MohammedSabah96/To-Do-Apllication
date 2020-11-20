import React from "react";
import { connect } from "react-redux";

const Todo = ({ todos }) =>
  todos !== null &&
  todos.length > 0 &&
  todos.map((todo) => (
    <div key={todo.id} className="todo">
      <li className="todo-item">{todo.title}</li>
      <button className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  ));

const mapStateToProps = (state) => ({
  todos: state.todo.todos,
});

export default connect(mapStateToProps)(Todo);
