export interface LogoutUseCase {
  logout(): Promise<void>;
}

export class LogoutUserUseCase implements LogoutUseCase {
  public logout(): Promise<void> {
    throw new Error('Not implemented');
  }
}
