import { AuthRepository, PrimeRepository, ApiRepository } from 'data/repositories';
import { ErrorMap, AuthMap, UserMap } from 'data/mappers';
import { IAuthData, IUserData, IUserFields, DomainErrors } from '../entities';
export interface IAccountService {
  getAccount(): Promise<IUserData | undefined>;
  login(): Promise<IAuthData | undefined>;
  logout(): Promise<void>;
}
export class AccountService implements IAccountService {
  constructor(
    public errorMap: ErrorMap,
    public auth: AuthRepository,
    public prime: PrimeRepository,
    public api: ApiRepository,
    public authMap: AuthMap,
    public userMap: UserMap
  ) {}

  async init(): Promise<IAuthData | undefined> {
    const authResponse = await this.auth.init();
    if (authResponse) {
      return this.authMap.toData(authResponse);
    }
  }

  async login(): Promise<IAuthData | undefined> {
    const authResponse = this.auth.getAuth();
    if (authResponse) {
      return this.authMap.toData(authResponse);
    } else {
      this.auth.authenticate();
    }
  }

  async logout(): Promise<void> {
    await this.auth.logout();
  }

  isAuthanticated(): boolean {
    return !!this.auth.getAuth();
  }

  async getAccount(): Promise<IUserData | undefined> {
    try {
      const response = await this.prime.users.me<IUserFields>();
      if (!response?.data) {
        throw new DomainErrors.NotAuthorized();
      }

      const userResponse = await this.api.users.get(response?.data.id);

      if (userResponse?.data && userResponse?.data.length > 0) {
        return this.userMap.toData(response?.data, userResponse.data[0]);
      } else {
        return this.userMap.toData(response?.data);
      }
    } catch (error) {
      this.errorMap.toDomain(error);
    }
  }
}
