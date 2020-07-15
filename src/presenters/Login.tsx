import * as React from 'react';
import LoginLogo from '../images/logo.png';
import { LoginServiceLocator } from '../servicelocators/LoginServiceLocator';
import {
  LoginButton,
  LoginError,
  LoginForm,
  LoginFormInput,
  LoginLogoContainer,
  LoginLogoImg,
} from '../styles/LoginStyles';

export interface LoginProps {
  loginServiceLocator: LoginServiceLocator;
  onLogIn: () => void;
}

export function Login({ loginServiceLocator, onLogIn }: LoginProps): React.ReactElement {
  const [formState, setFormState] = React.useState({ username: '', password: '', loginError: '' });

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, loginError: '', username: event.target.value });
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, loginError: '', password: event.target.value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const { username, password } = formState;
    if (!username || !password) {
      setFormState({ ...formState, loginError: 'Username and password are mandatory' });
      return;
    }
    try {
      await loginServiceLocator.loginUseCase.login(username, password);
    } catch (e) {
      setFormState({ ...formState, loginError: 'Server error, unable to obtain access token' });
      return;
    }
    onLogIn();
  };

  return (
    <LoginForm onSubmit={onSubmit}>
      <LoginLogoContainer>
        <LoginLogoImg src={LoginLogo} />
      </LoginLogoContainer>
      <LoginFormInput
        onChange={onUsernameChange}
        type="text"
        data-testid="login-username"
        name="username"
        placeholder="username"
      />
      <LoginFormInput
        onChange={onPasswordChange}
        type="password"
        data-testid="login-password"
        placeholder="password"
        name="password"
      />
      {formState.loginError ? (
        <LoginError data-testid="login-error">{formState.loginError}</LoginError>
      ) : null}
      <LoginButton type="submit" data-testid="login-submit" name="submit-login" value="Login" />
    </LoginForm>
  );
}
