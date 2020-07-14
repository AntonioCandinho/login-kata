import * as React from 'react';
import { MainProps, createMainCompoment } from './components/Main';
import { LogoutApplication } from '../logout/LogoutApplication';

export class MainApplication {
  public constructor(private logoutApplication: LogoutApplication) {}

  public static createDefault(): MainApplication {
    return new MainApplication(LogoutApplication.createDefault());
  }

  getMainComponent(): React.FunctionComponent<MainProps> {
    const LogoutComponent = this.logoutApplication.getLogoutComponent();
    const MainComponent = createMainCompoment(LogoutComponent);
    return MainComponent;
  }
}
