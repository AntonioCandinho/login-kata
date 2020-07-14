import * as React from 'react';
import { Logout, LogoutProps } from './components/Logout';
import { LogoutUseCase, LogoutUserUseCase } from './usecases/LogoutUseCase';

export class LogoutApplication {
  public constructor(private logoutUseCase: LogoutUseCase) {}

  public static createDefault(): LogoutApplication {
    return new LogoutApplication(new LogoutUserUseCase());
  }

  getLogoutComponent(): React.FunctionComponent<Omit<LogoutProps, 'logoutUseCase'>> {
    const LogoutApplication = (props: Omit<LogoutProps, 'logoutUseCase'>) => (
      <Logout {...props} logoutUseCase={this.logoutUseCase} />
    );
    return LogoutApplication;
  }
}
