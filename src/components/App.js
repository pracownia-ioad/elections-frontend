/* @flow */
import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import JssProvider from 'react-jss/lib/JssProvider';

import Landing from './Landing';

type Props = {};

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: red[400],
    },
  },
  typography: { useNextVariants: true },
});

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

class App extends React.Component<Props> {
  render() {
    return (
      <div className="App">
        <JssProvider generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Landing />
          </MuiThemeProvider>
        </JssProvider>
      </div>
    );
  }
}

export default App;
