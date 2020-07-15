import styled from 'styled-components';
import { PRIMARY_BLUE } from './colors';

export const LogoutButton = styled.a`
  background-color: ${PRIMARY_BLUE};
  color: white;
  border: 2px solid ${PRIMARY_BLUE};
  border-radius: 2px;
  font-weight: bold;
  padding: 0.4em;
  margin-right: 1em 1em;
  cursor: pointer;
`;
