import { describe, expect, it } from '@jest/globals';
import SetupTests from '../../setupTests';
import { UsersRepository, IUserResponse } from '.';
import qs from 'qs';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let users: IUserResponse[];
  beforeEach(() => {
    const axiosInstance = new SetupTests().init();
    if (axiosInstance) {
      usersRepository = new UsersRepository(axiosInstance);
    }
  });

  describe('list', () => {
    it('should return a list of Users', async () => {
      const response = await usersRepository.list({
        ids: ['12528945'],
      });
      if (response?.data) {
        users = response.data;
      }
      console.log(users);

      console.log(JSON.stringify(qs.parse(users[0]?.avatarQuery || '')));
      expect(users).toBeDefined();
    });
  });

  // describe('update', () => {
  //   it('should return the updated User', async () => {
  //     const response = await usersRepository.list({
  //       ids: ['12528945'],
  //     });
  //     if (response?.data) {
  //       users = response.data;
  //     }
  //     console.log(users);
  //     expect(users).toBeDefined();
  //   });
  // });
});
