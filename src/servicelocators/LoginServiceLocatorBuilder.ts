import {
  AuthenticationGateway,
  AuthTokenRetriever,
  AuthTokenRevoker,
} from '../gateways/AuthenticationGateway';
import { AccessTokenRepository } from '../repositories/AccessTokenRepository';
import { LocalStorageAccessTokenRepository } from '../repositories/LocalStorageAccessTokenRepository';
import { LoginUseCase, UserLogger } from '../usecases/LoginUseCase';
import { LogoutUseCase, LogoutUserUseCase } from '../usecases/LogoutUseCase';
import { LoginServiceLocator } from './LoginServiceLocator';

export class LoginServiceLocatorBuilder {
  private constructor(
    private accessTokenRepository: AccessTokenRepository,
    private authorizationGateway: AuthTokenRevoker & AuthTokenRetriever,
    private loginUseCase: LoginUseCase,
    private logoutUseCase: LogoutUseCase
  ) {}

  public static of(): LoginServiceLocatorBuilder {
    const repository = LocalStorageAccessTokenRepository.of();
    const authGateway = AuthenticationGateway.create();
    const loginUseCase = new UserLogger(authGateway, repository);
    const logoutUseCase = new LogoutUserUseCase(authGateway, repository);
    return new LoginServiceLocatorBuilder(repository, authGateway, loginUseCase, logoutUseCase);
  }

  public withAccessTokenRepository(accessTokenRepository: AccessTokenRepository): this {
    this.accessTokenRepository = accessTokenRepository;
    return this;
  }

  public withAuthotizationGateway(
    authorizationGateway: AuthTokenRevoker & AuthTokenRetriever
  ): this {
    this.authorizationGateway = authorizationGateway;
    return this;
  }

  public withLoginUseCase(loginUseCase: LoginUseCase): this {
    this.loginUseCase = loginUseCase;
    return this;
  }

  public withLogoutUseCase(logoutUseCase: LogoutUseCase): this {
    this.logoutUseCase = logoutUseCase;
    return this;
  }

  build(): LoginServiceLocator {
    return {
      accessTokenRepository: this.accessTokenRepository,
      authorizationGateway: this.authorizationGateway,
      loginUseCase: this.loginUseCase,
      logoutUseCase: this.logoutUseCase,
    };
  }
}
