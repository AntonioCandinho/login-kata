import * as React from 'react';
import { PRIMARY_BLUE } from '../styles/colors';
import styled from 'styled-components';

const LogoutButton = styled.a`
  background-color: ${PRIMARY_BLUE};
  color: white;
  border: 2px solid ${PRIMARY_BLUE};
  border-radius: 2px;
  font-weight: bold;
  padding: 0.4em;
  margin-right: 1em 1em;
  cursor: pointer;
`;

export const Logout = (): React.ReactElement => (
  <LogoutButton data-testid="logout-button">Logout</LogoutButton>
);
