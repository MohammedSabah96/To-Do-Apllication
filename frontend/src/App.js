import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./hocs/Layout";

import Activate from "./containers/Activate";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import ProfileSetting from "./containers/ProfileSetting";
import CompletedTodos from "./containers/CompletedTodos";
import CreateTodo from "./containers/CreateTodo";
import NotFound from "./components/NotFound";

import { Provider } from "react-redux";
import store from "./store";

import "./sass/main.scss";
require("dotenv").config();

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/activate/:uid/:token" component={Activate} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route
            path="/password/reset/confirm/:uid/:token"
            component={ResetPasswordConfirm}
          />
          <Route path="/settings" component={ProfileSetting} />
          <Route path="/completed" component={CompletedTodos} />
          <Route path="/create-todo" component={CreateTodo} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
);

export default App;
