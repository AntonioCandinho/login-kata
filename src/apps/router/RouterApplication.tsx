import * as React from 'react';
import { MainApplication } from '../main/MainApplication';
import { LoginApplication } from '../login/LoginApplication';

export class RouterApplication {
  constructor(
    private loginApplication: LoginApplication,
    private mainApplication: MainApplication
  ) {}

  public static createDefault(): RouterApplication {
    return new RouterApplication(LoginApplication.createDefault(), MainApplication.createDefault());
  }

  public getRouterComponent(): React.FunctionComponent {
    const RouterComponent = (): React.ReactElement => {
      const [isLoggedIn, setLoggedIn] = React.useState(false);
      const LoginComponent = this.loginApplication.getLoginComponent();
      const MainComponent = this.mainApplication.getMainComponent();
      return isLoggedIn ? (
        <MainComponent onLogOut={() => setLoggedIn(false)} />
      ) : (
        <LoginComponent onLogIn={() => setLoggedIn(true)} />
      );
    };
    return RouterComponent;
  }
}
