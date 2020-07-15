import styled from 'styled-components';

export const MainPageContainer = styled.div`
  font-family: sans-serif;
  color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: flex-end;
`;

export const MainContent = styled.div`
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

export const MainLogoContainer = styled.div`
  width: 50%;
  margin: 2em auto;
`;

export const MainLogoImage = styled.img`
  width: 100%;
  height: auto;
`;
