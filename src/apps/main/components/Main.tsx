import * as React from 'react';
import Logo from '../../../images/logo.png';
import { MainContent, MainLogoContainer, MainLogoImage, MainPageContainer } from './MainStyles';

export interface MainProps {
  onLogOut: () => void;
}
export function createMainCompoment(
  LogoutComponent: React.FunctionComponent<MainProps>
): React.FunctionComponent<MainProps> {
  const Main = (props: MainProps): React.ReactElement => (
    <MainPageContainer data-testid="main-page-container">
      <LogoutComponent {...props} />
      <MainContent>
        <MainLogoContainer>
          <MainLogoImage src={Logo}></MainLogoImage>
        </MainLogoContainer>
      </MainContent>
    </MainPageContainer>
  );
  return Main;
}
