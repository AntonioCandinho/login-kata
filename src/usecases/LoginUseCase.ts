import { AuthTokenRetriever } from '../gateways/AuthenticationGateway';
import { AccessTokenRepository } from '../repositories/AccessTokenRepository';

export interface LoginUseCase {
  login(username: string, password: string): Promise<void>;
}

export class UserLogger implements LoginUseCase {
  public constructor(
    private authTokenRetriever: AuthTokenRetriever,
    private repository: AccessTokenRepository
  ) {}

  async login(username: string, password: string): Promise<void> {
    const token = await this.authTokenRetriever.getAuthToken(username, password);
    this.repository.save(token);
  }
}
