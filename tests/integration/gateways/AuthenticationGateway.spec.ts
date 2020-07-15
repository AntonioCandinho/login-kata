import nodeFetch from 'node-fetch';
import { AuthenticationGateway } from '../../../src/gateways/AuthenticationGateway';

const SERVER_URL = 'http://localhost:3000';

describe('AuthenticationGateway', () => {
  const randomUsername = `username-${Math.random()}`;
  const randomPassword = `password-${Math.random()}`;

  const authenticationGateway = new AuthenticationGateway(
    `${SERVER_URL}/api/token`,
    `${SERVER_URL}/api/revoke`,
    (nodeFetch as unknown) as typeof fetch
  );

  it('should throw and error on bad formed', async () => {
    await expect(authenticationGateway.getAuthToken('', '')).rejects.toBeTruthy();
  });

  it('should throw and error when trying to revoke not found token', async () => {
    await expect(
      authenticationGateway.revokeAuthToken('AUTH_GW_TEST_NOT_FOUND')
    ).rejects.toBeTruthy();
  });

  describe('given an access token was obtained from the server', () => {
    let accessToken: string;

    beforeEach(async () => {
      accessToken = await authenticationGateway.getAuthToken(randomUsername, randomPassword);
    });

    it('should be able to revoke it', async () => {
      await authenticationGateway.revokeAuthToken(accessToken);
    });
  });
});
