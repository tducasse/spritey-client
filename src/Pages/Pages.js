import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";

const Pages = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
  </Switch>
);

export default Pages;
