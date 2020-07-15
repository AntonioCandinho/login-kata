import * as React from 'react';
import Logo from '../images/logo.png';
import { LoginServiceLocator } from '../servicelocators/LoginServiceLocator';
import {
  MainContent,
  MainLogoContainer,
  MainLogoImage,
  MainPageContainer,
} from '../styles/MainStyles';
import { Logout } from './Logout';

export interface MainProps {
  loginServiceLocator: LoginServiceLocator;
  onLogOut: () => void;
}

export const Main = (props: MainProps): React.ReactElement => (
  <MainPageContainer data-testid="main-page-container">
    <Logout {...props} />
    <MainContent>
      <MainLogoContainer>
        <MainLogoImage src={Logo}></MainLogoImage>
      </MainLogoContainer>
    </MainContent>
  </MainPageContainer>
);
