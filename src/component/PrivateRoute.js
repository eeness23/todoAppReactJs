import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, redirectToLogin, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props => (
        redirectToLogin ? <Redirect to="/login" /> : <Component {...props} />
      )}
    />
  );
};

export default PrivateRoute;
