import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "../components/AuthenticatedRoute";
import UnauthenticatedRoute from "../components/UnauthenticatedRoute";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFound";

const Pages = () => (
  <Switch>
    <AuthenticatedRoute exact path="/">
      <Home />
    </AuthenticatedRoute>
    <UnauthenticatedRoute exact path="/login">
      <Login />
    </UnauthenticatedRoute>
    <Route path="*">
      <NotFound />
    </Route>
  </Switch>
);

export default Pages;
