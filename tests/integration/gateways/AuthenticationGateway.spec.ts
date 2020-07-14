import nodeFetch from 'node-fetch';
import { AuthenticationGateway } from '../../../src/gateways/AuthenticationGateway';

const SERVER_URL = 'http://localhost:3000';

describe('AuthenticationGateway', () => {
  const randomUsername = `username-${Math.random()}`;
  const randomPassword = `password-${Math.random()}`;

  const authenticationGateway = new AuthenticationGateway(
    `${SERVER_URL}/api/token`,
    (nodeFetch as unknown) as typeof fetch
  );

  it('should be able to get a token from the server', async () => {
    const accessToken = await authenticationGateway.getAuthToken(randomUsername, randomPassword);
    expect(accessToken).toBeTruthy();
  });

  it('should throw and error on bad formed', async () => {
    await expect(authenticationGateway.getAuthToken('', '')).rejects.toBeTruthy();
  });
});
