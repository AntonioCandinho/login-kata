import { AccessTokenRepository } from './AccessTokenRepository';

export class InMemoryAccessTokenRepository implements AccessTokenRepository {
  private accessToken?: string;

  public save(accessToken: string): void {
    this.accessToken = accessToken;
  }

  public get(): string {
    if (!this.accessToken) {
      throw Error('Access token not found');
    }
    return this.accessToken;
  }

  public delete(): void {
    this.accessToken = null;
  }
}
