import {
  Repository,
  IPushNotificationsRepository,
  IPushNotificationResponse,
  IResponse,
  IPushNotificationsDeviceRequest,
} from '..';
import pushNotificationsData from './mockData/pushNotifications.json';
import pushNotificationPost from './mockData/pushNotificationPost.json';

export class PushNotificationsRepositoryMock extends Repository implements IPushNotificationsRepository {
  // POST:pushNotifications/registerDevice
  async registerDevice(data: IPushNotificationsDeviceRequest): Promise<IResponse<boolean> | undefined> {
    console.log(data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: true, isSuccess: true });
      }, 300);
    });
  }

  // GET:pushNotifications
  // async list(): Promise<IResponse<{ data: IPushNotificationResponse[]; totalItems: number }> | undefined> {
  //   console.log('list');
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(pushNotificationsData);
  //     }, 300);
  //   });
  // }

  async list(): Promise<IResponse<IPushNotificationResponse[]> | undefined> {
    console.log('list');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pushNotificationsData.data);
      }, 300);
    });
  }

  // GET:pushNotifications/id
  async get(id: string): Promise<IResponse<IPushNotificationResponse> | undefined> {
    console.log(id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pushNotificationPost);
      }, 300);
    });
  }

  // POST:pushNotifications
  async create(data: IPushNotificationResponse): Promise<IResponse<IPushNotificationResponse> | undefined> {
    console.log({ ...pushNotificationPost, data: { ...data, id: Math.random().toString() } });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...pushNotificationPost, data: { ...data, id: Math.random().toString() } });
      }, 300);
    });
  }

  // PUT:pushNotifications/id
  async edit(id: string, data: IPushNotificationResponse): Promise<IResponse<IPushNotificationResponse> | undefined> {
    console.log(id, { ...pushNotificationPost, data: { ...data, id: Math.random().toString() } });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...pushNotificationPost, data: { ...data, id: Math.random().toString() } });
      }, 300);
    });
  }

  // POST:pushNotifications/id/send
  async send(id: string): Promise<IResponse<IPushNotificationResponse> | undefined> {
    console.log(id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pushNotificationPost);
      }, 300);
    });
  }

  // DELETE:pushNotifications/id
  async delete(id: string): Promise<IResponse<boolean> | undefined> {
    console.log(id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: true, isSuccess: true });
      }, 300);
    });
  }
}
