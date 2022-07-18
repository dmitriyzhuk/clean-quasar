import { describe, expect, it, beforeAll } from '@jest/globals';
import SetupTests from '../../setupTests';
import { BadgesRepository } from '.';

describe('Repository/Prime/Badges', () => {
  let badgesRepository: BadgesRepository;
  let badgeId: string;
  const userId = '12528945';
  // let badge: IBadgeResponse;

  beforeAll(() => {
    const setupTests = new SetupTests();
    const axiosInstance = setupTests.init();
    if (axiosInstance) {
      badgesRepository = new BadgesRepository(axiosInstance);
    }
  });

  describe('list', () => {
    it('should return a list of Learning Objects', async () => {
      const response = await badgesRepository.list({
        include: ['badge', 'model'],
      });
      console.log(JSON.stringify(response));
      if (response?.data) {
        badgeId = response.data[0].id;
      }
      expect(response?.data).toBeDefined();
    });
  });

  describe('get', () => {
    it('should return a Learning Object', async () => {
      const response = await badgesRepository.get(badgeId);
      console.log(JSON.stringify(response));
      // if(response?.data){
      //     badge = response.data;
      // }
      expect(response).toBeDefined();
    });
  });

  describe('listAll', () => {
    it('should return a list of all Learning Objects', async () => {
      const response = await badgesRepository.listAll({
        maxLimit: 20,
        include: ['badge', 'model'],
      });
      console.log(JSON.stringify(response));
      expect(response).toBeDefined();
    });
  });

  describe('listUserBadges', () => {
    it('should return a list of Learning Objects', async () => {
      const response = await badgesRepository.listUserBadges(userId, {
        include: ['badge', 'model'],
      });
      console.log(JSON.stringify(response));
      if (response?.data) {
        badgeId = response.data[0].id;
      }
      expect(response?.data).toBeDefined();
    });
  });

  describe('getUserBadge', () => {
    it('should return a Learning Object', async () => {
      const response = await badgesRepository.getUserBadge(userId, badgeId);
      console.log(JSON.stringify(response));
      // if(response?.data){
      //     badge = response.data;
      // }
      expect(response).toBeDefined();
    });
  });

  describe('listAllUserBadges', () => {
    it('should return a list of all Learning Objects', async () => {
      const response = await badgesRepository.listAllUserBadges(userId, {
        maxLimit: 20,
        include: ['badge', 'model'],
      });
      console.log(JSON.stringify(response));
      expect(response).toBeDefined();
    });
  });
});
