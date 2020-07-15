import * as React from 'react';
import { Logout, LogoutProps } from './components/Logout';
import { LogoutUseCase, LogoutUserUseCase } from './usecases/LogoutUseCase';
import { AuthenticationGateway } from '../../gateways/AuthenticationGateway';
import { AccessTokenRepository } from '../../repositories/AccessTokenRepository';

export class LogoutApplication {
  public constructor(private logoutUseCase: LogoutUseCase) {}

  public static createDefault(repository: AccessTokenRepository): LogoutApplication {
    const authGateway = AuthenticationGateway.create();
    return new LogoutApplication(new LogoutUserUseCase(authGateway, repository));
  }

  getLogoutComponent(): React.FunctionComponent<Omit<LogoutProps, 'logoutUseCase'>> {
    const LogoutApplication = (props: Omit<LogoutProps, 'logoutUseCase'>) => (
      <Logout {...props} logoutUseCase={this.logoutUseCase} />
    );
    return LogoutApplication;
  }
}
