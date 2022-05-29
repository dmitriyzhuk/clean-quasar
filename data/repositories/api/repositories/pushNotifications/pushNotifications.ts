import {
  Repository,
  IPushNotificationsRepository,
  IPushNotificationResponse,
  IResponse,
  IPushNotificationsDeviceRequest,
} from '..';

export class PushNotificationsRepository extends Repository implements IPushNotificationsRepository {
  // POST:pushNotifications/registerDevice
  async registerDevice(data: IPushNotificationsDeviceRequest): Promise<IResponse<boolean> | undefined> {
    const response = await this.request<boolean>({
      method: 'post',
      path: 'pushNotifications/registerDevice',
      data,
    });

    return response;
  }

  // GET:pushNotifications
  // async list(): Promise<IResponse<{ data: IPushNotificationResponse[]; totalItems: number }> | undefined> {
  //   const response = await this.request<{ data: IPushNotificationResponse[]; totalItems: number }>({
  //     method: 'get',
  //     path: 'pushNotifications',
  //   });

  //   return response;
  // }

  async list(): Promise<IResponse<IPushNotificationResponse[]> | undefined> {
    const response = await this.request<IPushNotificationResponse[]>({
      method: 'get',
      path: 'pushNotifications',
    });

    return response;
  }

  // GET:pushNotifications/id
  async get(id: string): Promise<IResponse<IPushNotificationResponse> | undefined> {
    const response = await this.request<IPushNotificationResponse>({
      method: 'get',
      path: `pushNotifications/${id}`,
    });

    return response;
  }

  // POST:pushNotifications
  async create(data: IPushNotificationResponse): Promise<IResponse<IPushNotificationResponse> | undefined> {
    const response = await this.request<IPushNotificationResponse>({
      method: 'post',
      path: 'pushNotifications',
      data,
    });

    return response;
  }

  // PUT:pushNotifications/id
  async edit(id: string, data: IPushNotificationResponse): Promise<IResponse<IPushNotificationResponse> | undefined> {
    const response = await this.request<IPushNotificationResponse>({
      method: 'put',
      path: `pushNotifications/${id}`,
      data,
    });

    return response;
  }

  // POST:pushNotifications/id/send
  async send(id: string): Promise<IResponse<IPushNotificationResponse> | undefined> {
    const response = await this.request<IPushNotificationResponse>({
      method: 'post',
      path: `pushNotifications/${id}/send`,
    });

    return response;
  }

  // DELETE:pushNotifications/id
  async delete(id: string): Promise<IResponse<boolean> | undefined> {
    const response = await this.request<boolean>({
      method: 'delete',
      path: `pushNotifications/${id}`,
    });

    return response;
  }
}
