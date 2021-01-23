import React from "react";
import { Link } from "react-router-dom";

const LoginButton = ({ isLoggedIn, logout }) => {
  if (isLoggedIn) {
    return <button onClick={logout}>Logout</button>;
  }
  return <Link to="/login">Log in</Link>;
};

export default LoginButton;
