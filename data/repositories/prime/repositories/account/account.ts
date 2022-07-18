import { Repository, IAccountRepository, IAccountResponse } from '..';

export class AccountRepository extends Repository implements IAccountRepository {
  async get(): Promise<IAccountResponse | undefined> {
    const response = await this.request<IAccountResponse>({
      method: 'get',
      path: 'account',
    });
    return response?.data;
  }
}
