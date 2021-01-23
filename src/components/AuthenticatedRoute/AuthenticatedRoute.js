import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAppContext } from "../../utils/context";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { pathname, search } = useLocation();
  const { isLoggedIn } = useAppContext();
  return (
    <Route {...rest}>
      {isLoggedIn ? (
        children
      ) : (
        <Redirect to={`/login?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
}
