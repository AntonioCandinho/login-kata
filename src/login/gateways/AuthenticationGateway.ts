export interface AuthTokenRetriever {
  getAuthToken(username: string, password: string): Promise<string>;
}

export class AuthenticationGateway implements AuthTokenRetriever {
  public async getAuthToken(): Promise<string> {
    throw new Error('Not implemented');
  }
}
