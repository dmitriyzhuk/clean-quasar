import { describe, expect, it, beforeAll } from '@jest/globals';
import SetupTests from '../../setupTests';
import { UsersRepository, IUserResponse } from '.';

interface IUserFields {
  country: string;
}

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let user: IUserResponse<IUserFields>;
  // let users: IUserResponse<IUserFields>[];
  beforeAll(() => {
    const setupTests = new SetupTests();
    const axiosInstance = setupTests.init();
    if (axiosInstance) {
      usersRepository = new UsersRepository(axiosInstance);
    }
  });

  describe('me', () => {
    it('should return a Account data', async () => {
      const response = await usersRepository.me<IUserFields>();
      if (response?.data) {
        user = response.data;
      }
      expect(response).toBeDefined();
    });

    it('user should have custom filed Country', () => {
      console.log(user);
      expect(user.attributes?.fields?.country).toBeDefined();
    });
  });

  // describe('list', () => {
  //     it('should return a Account data', async () => {
  //         const response = await usersRepository.list<IUserFields>({
  //             filter:'gamification'
  //         })
  //         // if(response?.data){
  //         //     users = response.data;
  //         // }
  //         console.log(response)
  //         expect(response).toBeDefined();
  //     });
  // });

  describe('list gamificationAll', () => {
    it('should return a Account data', async () => {
      const response = await usersRepository.list<IUserFields>({
        sort: 'id',
        filter: 'gamificationAll',
      });
      // if(response?.data){
      //     users = response.data;
      // }
      console.log(response);
      expect(response).toBeDefined();
    });
  });
});
