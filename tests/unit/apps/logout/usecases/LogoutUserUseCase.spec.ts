import { AuthTokenRevoker } from '../../../../../src/gateways/AuthenticationGateway';
import { AccessTokenRepository } from '../../../../../src/repositories/AccessTokenRepository';
import {
  LogoutUseCase,
  LogoutUserUseCase,
} from '../../../../../src/apps/logout/usecases/LogoutUseCase';

describe('LogoutUserUseCase', () => {
  let tokenRevokerMock: AuthTokenRevoker & { revokeAuthToken: jest.Mock<Promise<void>, [string]> };
  let accessTokenRepositoryMock: AccessTokenRepository & {
    get: jest.Mock<string>;
    save: jest.Mock<void, [string]>;
    delete: jest.Mock<void>;
  };
  let logoutUseCase: LogoutUseCase;

  beforeEach(() => {
    tokenRevokerMock = { revokeAuthToken: jest.fn() };
    accessTokenRepositoryMock = { get: jest.fn(), delete: jest.fn(), save: jest.fn() };
    accessTokenRepositoryMock.get.mockImplementation(() => {
      throw Error('No token');
    });
    logoutUseCase = new LogoutUserUseCase(tokenRevokerMock, accessTokenRepositoryMock);
  });

  it('should fail with a log if no token', async () => {
    await logoutUseCase.logout();
  });

  describe('given some access token', () => {
    const accessToken = `${Math.random()}`;

    beforeEach(() => {
      accessTokenRepositoryMock.get.mockReturnValue(accessToken);
    });

    it('should revoke the token', async () => {
      await logoutUseCase.logout();
      expect(tokenRevokerMock.revokeAuthToken).toBeCalledWith(accessToken);
    });

    it('should delete the token from the store', async () => {
      await logoutUseCase.logout();
      expect(accessTokenRepositoryMock.delete).toBeCalled;
    });

    it('should ignore revoke token errors', async () => {
      tokenRevokerMock.revokeAuthToken.mockRejectedValue(Error('an error'));
      await logoutUseCase.logout();
    });
  });
});
