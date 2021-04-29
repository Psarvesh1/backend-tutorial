import React from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Post from './components/Post'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component = {Post} />
      </Switch>
    </Router>
  );
};
export default App;
