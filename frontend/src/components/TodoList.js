import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { get_todos } from "../actions/todo";
import Todo from "./Todo";

const TodoList = ({ path, get_todos, todos, completed_todos }) => {
  useEffect(() => {
    get_todos();
  }, [get_todos]);

  const handler_todos = (todos) => {
    return (
      todos !== null &&
      todos.length > 0 &&
      todos.map((todo) => <Todo key={todo.slug} todo={todo} />)
    );
  };
  const show_todos = () => {
    if (path === "/completed") {
      if (completed_todos && completed_todos.length > 0) {
        return handler_todos(completed_todos);
      } else {
        return <h4>You Don't have any Todo complete.</h4>;
      }
    } else {
      if (todos && todos.length > 0) {
        return handler_todos(todos);
      } else {
        return (
          <div>
            <h5>You Don't have any Todos!!</h5>
            <Link
              className="btn btn-outline-secondary btn-block"
              to="/create-todo"
            >
              Create Some!!
            </Link>
          </div>
        );
      }
    }
  };
  return (
    <div className="todo-container mt-5">
      <ul className="todo-list">{show_todos()}</ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todo.todos,
  completed_todos: state.todo.completed_todos,
});

export default connect(mapStateToProps, { get_todos })(TodoList);
