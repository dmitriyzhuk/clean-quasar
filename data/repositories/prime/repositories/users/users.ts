import { Repository, IResponse, IUsersRepository, IUserResponse, IUserOptions, UserIncludeType } from '..';
import { mapUserOptionsToRequestParams } from './users.map';

export class UsersRepository extends Repository implements IUsersRepository {
  async me<IUserFields>(): Promise<IResponse<IUserResponse<IUserFields>> | undefined> {
    const response = await this.request<IUserResponse<IUserFields>>({
      method: 'get',
      path: 'user',
    });
    return response;
  }

  async get<IUserFields>(
    id: string,
    options?: { include?: UserIncludeType[] }
  ): Promise<IResponse<IUserResponse<IUserFields>> | undefined> {
    const params = typeof options == 'string' ? options : mapUserOptionsToRequestParams(options);
    const response = await this.request<IUserResponse<IUserFields>>({
      method: 'get',
      path: `users/${id}`,
      options: { params },
    });
    return response;
  }

  async list<IUserFields>(
    options: IUserOptions | string
  ): Promise<IResponse<IUserResponse<IUserFields>[]> | undefined> {
    const params = typeof options == 'string' ? options : mapUserOptionsToRequestParams(options);
    const response = await this.request<IUserResponse<IUserFields>[]>({
      method: 'get',
      path: 'users',
      options: { params },
    });
    return response;
  }
}
