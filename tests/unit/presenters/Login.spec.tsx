import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import * as React from 'react';
import { Login } from '../../../src/presenters/Login';
import { LoginServiceLocator } from '../../../src/servicelocators/LoginServiceLocator';
import { LoginUseCase } from '../../../src/usecases/LoginUseCase';

describe('Login component', () => {
  const randomUsername = `any-username-${Math.random()}`;
  const randomPassword = `any-password-${Math.random()}`;

  let loginUseCase: LoginUseCase & { login: jest.Mock<Promise<void>, [string, string]> };
  let onLogIn: jest.Mock<void>;
  let loginComponent: RenderResult;

  beforeEach(() => {
    onLogIn = jest.fn();
    loginUseCase = { login: jest.fn() };
    const locator: LoginServiceLocator = {
      loginUseCase,
      accessTokenRepository: null,
      authorizationGateway: null,
      logoutUseCase: null,
    };
    loginComponent = render(<Login loginServiceLocator={locator} onLogIn={onLogIn} />);
  });

  const login = (username: string, password: string) => {
    fireEvent.change(loginComponent.getByTestId('login-username'), {
      target: { value: username },
    });
    fireEvent.change(loginComponent.getByTestId('login-password'), {
      target: { value: password },
    });
    fireEvent.click(loginComponent.getByTestId('login-submit'));
  };

  it('should call login use case with username and password', () => {
    login(randomUsername, randomPassword);
    expect(loginUseCase.login).toBeCalledWith(randomUsername, randomPassword);
  });

  it('should call onLogIn call back on succesfull login', async () => {
    login(randomUsername, randomPassword);
    await waitFor(() => expect(onLogIn).toHaveBeenCalled());
  });

  it('with no user or password should print an error', async () => {
    login('', '');
    await waitFor(() => {
      const loginError = loginComponent.getByTestId('login-error');
      expect(loginError.textContent).not.toEqual('');
    });
  });

  it('if use case fails should print an error', async () => {
    loginUseCase.login.mockRejectedValue(Error('Some error'));
    login(randomUsername, randomPassword);
    await waitFor(() => {
      const loginError = loginComponent.getByTestId('login-error');
      expect(loginError.textContent).not.toEqual('');
    });
  });
});
