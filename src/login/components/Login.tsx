import * as React from 'react';
import { LoginUseCase } from '../usecases/LoginUseCase';

export interface LoginProps {
  onLogIn: () => void;
  loginUseCase: LoginUseCase;
}

export function Login({ loginUseCase, onLogIn }: LoginProps): React.ReactElement {
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
    await loginUseCase.login(username, password);
    onLogIn();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Username:
          <input
            onChange={onUsernameChange}
            type="text"
            data-testid="login-username"
            name="username"
          />
        </label>
        <label>
          Password:
          <input
            onChange={onPasswordChange}
            type="password"
            data-testid="login-password"
            name="password"
          />
        </label>
        {formState.loginError ? (
          <span data-testid="login-error"> {formState.loginError} </span>
        ) : null}
        <input type="submit" data-testid="login-submit" name="submit-login" value="Submit" />
      </form>
    </div>
  );
}
