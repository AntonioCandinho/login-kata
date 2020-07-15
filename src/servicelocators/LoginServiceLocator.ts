import { AuthTokenRetriever, AuthTokenRevoker } from '../gateways/AuthenticationGateway';
import { AccessTokenRepository } from '../repositories/AccessTokenRepository';
import { LoginUseCase } from '../usecases/LoginUseCase';
import { LogoutUseCase } from '../usecases/LogoutUseCase';

export interface LoginServiceLocator {
  readonly accessTokenRepository: AccessTokenRepository;
  readonly authorizationGateway: AuthTokenRevoker & AuthTokenRetriever;
  readonly loginUseCase: LoginUseCase;
  readonly logoutUseCase: LogoutUseCase;
}
