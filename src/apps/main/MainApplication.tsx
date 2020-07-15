import * as React from 'react';
import { MainProps, createMainCompoment } from './components/Main';
import { LogoutApplication } from '../logout/LogoutApplication';
import { AccessTokenRepository } from '../../repositories/AccessTokenRepository';

export class MainApplication {
  public constructor(private logoutApplication: LogoutApplication) {}

  public static createDefault(repository: AccessTokenRepository): MainApplication {
    return new MainApplication(LogoutApplication.createDefault(repository));
  }

  getMainComponent(): React.FunctionComponent<MainProps> {
    const LogoutComponent = this.logoutApplication.getLogoutComponent();
    const MainComponent = createMainCompoment(LogoutComponent);
    return MainComponent;
  }
}
