import { AuthTokenRetriever } from '../../../gateways/AuthenticationGateway';

export interface LoginUseCase {
  login(username: string, password: string): Promise<void>;
}

export class UserLogger implements LoginUseCase {
  public constructor(private authTokenRetriever: AuthTokenRetriever) {}

  async login(username: string, password: string): Promise<void> {
    await this.authTokenRetriever.getAuthToken(username, password);
  }
}
