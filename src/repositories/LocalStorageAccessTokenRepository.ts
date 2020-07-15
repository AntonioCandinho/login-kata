import { AccessTokenRepository } from './AccessTokenRepository';

export class LocalStorageAccessTokenRepository implements AccessTokenRepository {
  public static readonly STORE_KEY = 'login_kata_access_token';

  public constructor(private storeManager: Storage) {}

  public static of(): LocalStorageAccessTokenRepository {
    return new LocalStorageAccessTokenRepository(window.localStorage);
  }

  public save(accessToken: string): void {
    this.storeManager.setItem(LocalStorageAccessTokenRepository.STORE_KEY, accessToken);
  }

  public isStored(): boolean {
    return !!this.storeManager.getItem(LocalStorageAccessTokenRepository.STORE_KEY);
  }

  public get(): string {
    const accessToken = this.storeManager.getItem(LocalStorageAccessTokenRepository.STORE_KEY);
    if (!accessToken) {
      throw Error('Access token not found');
    }
    return accessToken;
  }

  public delete(): void {
    this.storeManager.removeItem(LocalStorageAccessTokenRepository.STORE_KEY);
  }
}
