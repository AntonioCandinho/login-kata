import * as React from 'react';
import { Main } from '../main/Main';
import { Login } from '../login/Login';

export const Router = (): React.ReactElement => {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  return isLoggedIn ? <Main /> : <Login onLogIn={() => setLoggedIn(true)} />;
};
