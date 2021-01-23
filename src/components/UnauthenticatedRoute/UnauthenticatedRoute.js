import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "../../utils/context";

const querystring = (name, url = window.location.href) => {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export default function UnauthenticatedRoute({ children, ...rest }) {
  const { isLoggedIn } = useAppContext();
  const redirect = querystring("redirect");
  return (
    <Route {...rest}>
      {!isLoggedIn ? children : <Redirect to={redirect || "/"} />}
    </Route>
  );
}
