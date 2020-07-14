import * as React from 'react';
import Logo from '../images/logo.png';
import styled from 'styled-components';
import { Logout } from '../logout/Logout';

const MainPageContainer = styled.div`
  font-family: sans-serif;
  color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: flex-end;
`;

const MainContent = styled.div`
  position: absolute;
  margin: 0;
  top: 40%;
  left: 50%;
  -ms-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainLogoContainer = styled.div`
  width: 50%;
  margin: 2em auto;
`;

const MainLogoImage = styled.img`
  width: 100%;
  height: auto;
`;

export const Main = (): React.ReactElement => (
  <MainPageContainer data-testid="main-page-container">
    <Logout />
    <MainContent>
      <MainLogoContainer>
        <MainLogoImage src={Logo}></MainLogoImage>
      </MainLogoContainer>
    </MainContent>
  </MainPageContainer>
);
