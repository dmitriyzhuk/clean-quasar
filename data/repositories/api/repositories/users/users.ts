import { Repository, IResponse, IUsersRepository, IUserResponse, IUserOptions, IUserUpdateRequest } from '..';

import {
  // mapUserOptionsToRequestParams,
  mapIdsToQuery,
} from './users.map';

export class UsersRepository extends Repository implements IUsersRepository {
  async get(id: string): Promise<IResponse<IUserResponse[]> | undefined> {
    // const params = (typeof(options) == 'string') ? options : mapUserOptionsToRequestParams(options);
    const query = mapIdsToQuery([id]);
    const response = await this.request<IUserResponse[]>({
      method: 'get',
      path: `users?${query}`,
      // options: { params }
    });

    return response;
  }

  async list(options: IUserOptions | string): Promise<IResponse<IUserResponse[]> | undefined> {
    // const params = (typeof(options) == 'string') ? options : mapUserOptionsToRequestParams(options);
    const query = typeof options == 'string' ? '' : mapIdsToQuery(options?.ids);
    const response = await this.request<IUserResponse[]>({
      method: 'get',
      path: `users?${query}`,
      // options: { params }
    });

    return response;
  }

  async update(data: IUserUpdateRequest): Promise<IResponse<IUserResponse> | undefined> {
    const response = await this.request<IUserResponse>({
      method: 'put',
      path: 'users/upload',
      data,
    });
    return response;
  }
}
