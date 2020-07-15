export interface AccessTokenRepository {
  save(accessToken: string): void;
  get(): string;
  delete(): void;
}
