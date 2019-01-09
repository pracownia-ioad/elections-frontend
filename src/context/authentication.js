/* @flow */
import React from 'react';

export type AuthenticationType = {
  id: string,
  firstName: string,
  lastName: string,
  index: string,
  isAdmin: boolean,
} | null;

const AuthenticationContext = React.createContext<AuthenticationType>(null);

export default AuthenticationContext;
