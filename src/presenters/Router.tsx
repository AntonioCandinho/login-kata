import * as React from 'react';
import { LoginServiceLocator } from '../servicelocators/LoginServiceLocator';
import { Login } from './Login';
import { Main } from './Main';

export interface RouterProps {
  loginServiceLocator: LoginServiceLocator;
}

export const Router = (props: RouterProps): React.ReactElement => {
  // eslint-disable-next-line
  const defaultState = props.loginServiceLocator.accessTokenRepository.isStored();
  const [isLoggedIn, setLoggedIn] = React.useState(defaultState);
  return isLoggedIn ? (
    <Main {...props} onLogOut={() => setLoggedIn(false)} />
  ) : (
    <Login {...props} onLogIn={() => setLoggedIn(true)} />
  );
};
