import React from "react";
import TodoList from "../components/TodoList";

const CompletedTodos = ({ match }) => (
  <div className="container">
    <TodoList path={match.path} />
  </div>
);

export default CompletedTodos;
