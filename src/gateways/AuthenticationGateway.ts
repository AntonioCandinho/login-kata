import log from 'roarr';

export interface AuthTokenRetriever {
  getAuthToken(username: string, password: string): Promise<string>;
}

export interface AuthTokenRevoker {
  revokeAuthToken(token: string): Promise<void>;
}

export class AuthenticationGateway implements AuthTokenRetriever, AuthTokenRevoker {
  public constructor(
    private tokenEndpoint: string,
    private revokeEndpoint: string,
    private fetcher: typeof fetch
  ) {}

  public static create(): AuthenticationGateway {
    return new AuthenticationGateway('/api/token', '/api/revoke', window.fetch.bind(window));
  }

  public async getAuthToken(username: string, password: string): Promise<string> {
    const response = await this.fetcher(this.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=password&username=${username}&password=${password}`,
    });
    if (!response.ok) {
      log.error(`Received error from authorization server: `, response.statusText);
      throw Error('Authentication server error, unable to obtain token');
    }
    const data = await response.json();
    return data.access_token;
  }

  public async revokeAuthToken(token: string): Promise<void> {
    const response = await this.fetcher(this.revokeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `token=${token}`,
    });
    if (!response.ok) {
      log.error(`Received error from authorization server: `, response.statusText);
      throw Error('Authentication server error, unable to revoke token');
    }
  }
}
