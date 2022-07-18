import { describe, expect, it, beforeAll } from '@jest/globals';
import SetupTests from '../../setupTests';
import { UserNotificationsRepository, IUserNotificationResponse } from '.';

describe('Repository/Prime/UserNotifications', () => {
  let userNotificationsRepository: UserNotificationsRepository;
  // let userNotificationId: string;
  let userNotifications: IUserNotificationResponse[];
  const userId = '12528945';

  beforeAll(() => {
    const setupTests = new SetupTests();
    const axiosInstance = setupTests.init();
    if (axiosInstance) {
      userNotificationsRepository = new UserNotificationsRepository(axiosInstance);
    }
  });

  describe('get', () => {
    it('should return a Learning Object', async () => {
      const response = await userNotificationsRepository.get(userId);
      console.log(JSON.stringify(response));
      if (response?.data) {
        userNotifications = response.data;
      }
      expect(userNotifications).toBeDefined();
    });
  });
});
