/* @flow */
import * as React from 'react';

import AuthenticationContext, {
  type AuthenticationType,
} from '../context/authentication';

export default function withAuthentication<Config: {}>(
  Component: React.AbstractComponent<Config>
): React.AbstractComponent<$Diff<Config, { user: AuthenticationType | void }>> {
  return function WrapperComponent(
    props: $Diff<Config, { user: AuthenticationType | void }>
  ) {
    return (
      <AuthenticationContext.Consumer>
        {authData => <Component {...props} user={authData} />}
      </AuthenticationContext.Consumer>
    );
  };
}
