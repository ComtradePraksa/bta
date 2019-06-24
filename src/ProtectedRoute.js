import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.jwtoken
      ? <Component {...props} {...rest} />
      : <Redirect to='/' />
  )} />
)