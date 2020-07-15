import * as React from 'react';
import { LogoutButton } from '../styles/LogoutStyles';
import { LoginServiceLocator } from '../servicelocators/LoginServiceLocator';

export interface LogoutProps {
  loginServiceLocator: LoginServiceLocator;
  onLogOut: () => void;
}

export function Logout(props: LogoutProps): React.ReactElement {
  const { loginServiceLocator, onLogOut } = props;
  const onClick = async () => {
    await loginServiceLocator.logoutUseCase.logout();
    onLogOut();
  };
  return (
    <LogoutButton data-testid="logout-button" onClick={onClick}>
      Logout
    </LogoutButton>
  );
}
