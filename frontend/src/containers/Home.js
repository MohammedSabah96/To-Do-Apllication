import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FormTodo from "../components/FormTodo";
import TodoList from "../components/TodoList";

const Home = ({ isAuthenticated, user }) => {
  const guest = () => (
    <div className="jumbotron mt-5">
      <h1 className="display-4">Welcome to ToDo Application!</h1>
      <p className="lead">This ToDo has an authentication system.</p>
      <hr className="my-4" />
      <p>Click the Log In button</p>
      <Link className="btn btn-primary btn-lg" to="/login" role="button">
        Login
      </Link>
    </div>
  );
  const auth = () => (
    <Fragment>
      <header>
        <h1>{user ? user.username : null} Todo List</h1>
      </header>
      <FormTodo />
      <TodoList />
    </Fragment>
  );
  return <div className="container">{isAuthenticated ? auth() : guest()}</div>;
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Home);
