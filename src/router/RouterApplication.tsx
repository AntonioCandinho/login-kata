import * as React from 'react';
import { Main } from '../main/Main';
import { LoginApplication } from '../login/LoginApplication';

export class RouterApplication {
  constructor(private loginApplication: LoginApplication) {}

  public static createDefault(): RouterApplication {
    return new RouterApplication(LoginApplication.createDefault());
  }

  public getRouterComponent(): React.FunctionComponent {
    const RouterComponent = (): React.ReactElement => {
      const [isLoggedIn, setLoggedIn] = React.useState(false);
      const LoginComponent = this.loginApplication.getLoginComponent();
      return isLoggedIn ? <Main /> : <LoginComponent onLogIn={() => setLoggedIn(true)} />;
    };
    return RouterComponent;
  }
}
