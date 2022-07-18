/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { defineStore } from 'pinia';
import { container } from 'setup/di';
import { IUserData } from 'domain/entities';
import { AccountService } from 'domain/services';
import { UserMap } from 'data/mappers';
import { authanticate, errorHandler } from 'src/utils';

export default defineStore('account', {
  state: () => ({
    account: {} as IUserData,
  }),
  getters: {
    getAccount: (state) => container.get<UserMap>('UserMap').toDomain(state.account),
    isAuthanticated: () => container.get<AccountService>('AccountService').isAuthanticated(),
  },
  actions: {
    async init() {
      if (this.isAuthanticated) {
        await this.fetchAccount();
      }
    },
    async fetchAccount() {
      try {
        this.account = (await container.get<AccountService>('AccountService').getAccount()) || ({} as IUserData);
      } catch (error) {
        errorHandler(error);
      }
    },
    changeRole(role: string) {
      throw Error(`store action not implemented yet ${role}`);
    },
    async login() {
      try {
        const auth = await container.get<AccountService>('AccountService').login();
        if (auth) await authanticate(auth);
      } catch (error) {
        errorHandler(error);
      }
    },
    async logout() {
      void (await container.get<AccountService>('AccountService').logout());
    },
  },
});
