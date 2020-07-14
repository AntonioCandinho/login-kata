import * as React from 'react';
import { LogoutButton } from './LogoutStyles';
import { LogoutUseCase } from '../usecases/LogoutUseCase';

export interface LogoutProps {
  logoutUseCase: LogoutUseCase;
  onLogOut: () => void;
}
export function Logout(props: LogoutProps): React.ReactElement {
  const { logoutUseCase, onLogOut } = props;
  const onClick = async () => {
    await logoutUseCase.logout();
    onLogOut();
  };
  return (
    <LogoutButton data-testid="logout-button" onClick={onClick}>
      Logout
    </LogoutButton>
  );
}
