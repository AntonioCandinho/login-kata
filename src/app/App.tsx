import * as React from 'react';
import styled from 'styled-components';
import Flame from './flame.svg';

const CenteredDiv = styled.div`
  font-size: 1.5em;
  color: palevioletred;
  right: 50%;
  top: 50%;
  margin: 0;
  position: absolute;
  transform: translateX(50%) translateY(-50%);
`;

const PaleVioletH1 = styled.h1`
  font-size: 3em;
  color: palevioletred;
`;

export const App = (): React.ReactElement => (
  <CenteredDiv>
    <img src={String(Flame)} />
    <PaleVioletH1>Hello World!</PaleVioletH1>
  </CenteredDiv>
);
