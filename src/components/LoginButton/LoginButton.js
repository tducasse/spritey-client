import React from "react";
import { Link } from "react-router-dom";

const LoginButton = ({ loggedIn }) => {
  let text = "Log out";
  let route = "/logout";
  if (!loggedIn) {
    text = "Log in";
    route = "/login";
  }
  return <Link to={route}>{text}</Link>;
};

export default LoginButton;
