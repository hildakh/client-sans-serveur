import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from './components/Login';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      {/* Finally, catch all unmatched routes */}
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}
