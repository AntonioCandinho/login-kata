import * as React from 'react';
import { MainApplication } from '../main/MainApplication';
import { LoginApplication } from '../login/LoginApplication';
import { InMemoryAccessTokenRepository } from '../../repositories/InMemoryAccessTokenRepository';

export class RouterApplication {
  constructor(
    private loginApplication: LoginApplication,
    private mainApplication: MainApplication
  ) {}

  public static createDefault(): RouterApplication {
    const repository = new InMemoryAccessTokenRepository();
    return new RouterApplication(
      LoginApplication.createDefault(repository),
      MainApplication.createDefault(repository)
    );
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
