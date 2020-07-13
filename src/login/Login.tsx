import * as React from 'react';
//import styled from 'styled-components';

export interface LoginProps {
  onLogIn: () => void;
}

export const Login = (props: LoginProps): React.ReactElement => (
  <div>
    <form>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password: <input type="password" name="password" />
      </label>
      <input type="submit" name="submit-login" value="Submit" />
    </form>
  </div>
);
