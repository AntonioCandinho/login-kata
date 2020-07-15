import log from 'roarr';
import { AuthTokenRevoker } from '../gateways/AuthenticationGateway';
import { AccessTokenRepository } from '../repositories/AccessTokenRepository';

export interface LogoutUseCase {
  logout(): Promise<void>;
}

export class LogoutUserUseCase implements LogoutUseCase {
  public constructor(
    private tokenRevoker: AuthTokenRevoker,
    private repository: AccessTokenRepository
  ) {}

  public async logout(): Promise<void> {
    let accessToken: string;
    try {
      accessToken = this.repository.get();
    } catch (e) {
      log.warn('No access token found, logout already done!');
      return;
    }
    this.repository.delete();
    try {
      await this.tokenRevoker.revokeAuthToken(accessToken);
    } catch (e) {
      log.warn(`There has been an error doing logout: ${e.message}. Ignoring it!`);
    }
  }
}
