import * as React from 'react';
import { Login, LoginProps } from './components/Login';
import { UserLogger, LoginUseCase } from './usecases/LoginUseCase';
import { AuthenticationGateway } from './gateways/AuthenticationGateway';

export class LoginApplication {
  public constructor(private loginUseCase: LoginUseCase) {}

  public static createDefault(): LoginApplication {
    const authGateway = AuthenticationGateway.create();
    const loginUserUseCase = new UserLogger(authGateway);
    return new LoginApplication(loginUserUseCase);
  }

  getLoginComponent(): React.FunctionComponent<Omit<LoginProps, 'loginUseCase'>> {
    const LoginApplication = (props: Omit<LoginProps, 'loginUseCase'>) => (
      <Login {...props} loginUseCase={this.loginUseCase} />
    );
    return LoginApplication;
  }
}
