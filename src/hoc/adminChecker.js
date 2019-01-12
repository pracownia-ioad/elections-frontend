/* @flow */
import * as React from 'react';
import { navigate } from '@reach/router';

import { AUTH_DATA_KEY } from '../constants';
import { type AuthenticationType } from '../context/authentication';

export default function adminChecker<Config: {}>(
  Component: React.AbstractComponent<Config>
): React.AbstractComponent<$Diff<Config, {}>> {
  return function WrapperComponent(props: $Diff<Config, {}>) {
    React.useEffect(() => {
      const authData: AuthenticationType = JSON.parse(
        window.localStorage.getItem(AUTH_DATA_KEY)
      );
      if (!authData) {
        navigate('/');
      } else if (!authData.isAdmin) {
        navigate('/dashboard/user');
      }
    });

    return <Component {...props} />;
  };
}
