export interface AccessTokenRepository {
  save(accessToken: string): void;
  isStored(): boolean;
  get(): string;
  delete(): void;
}
