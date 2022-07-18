import { describe, expect, it, beforeAll } from '@jest/globals';
import SetupTests from '../../setupTests';
import { AccountRepository } from '.';

describe('AccountRepository', () => {
  let accountRepository: AccountRepository;
  // let account: IAccountResponse;

  beforeAll(() => {
    const setupTests = new SetupTests();
    const axiosInstance = setupTests.init();
    if (axiosInstance) {
      accountRepository = new AccountRepository(axiosInstance);
    }
  });

  describe('get', () => {
    it('should return a Account data', async () => {
      const response = await accountRepository.get();
      console.log(response);
      expect(response).toBeDefined();
    });
  });
});
