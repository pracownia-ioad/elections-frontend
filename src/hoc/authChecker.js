/* @flow */
import * as React from 'react';
import { navigate } from '@reach/router';

import { AUTH_DATA_KEY } from '../constants';

export default function authChecker<Config: {}>(
  Component: React.AbstractComponent<Config>
): React.AbstractComponent<$Diff<Config, {}>> {
  return function WrapperComponent(props: $Diff<Config, {}>) {
    React.useEffect(() => {
      const authData = JSON.parse(window.localStorage.getItem(AUTH_DATA_KEY));
      if (!authData) {
        navigate('/');
      }
    });

    return <Component {...props} />;
  };
}
