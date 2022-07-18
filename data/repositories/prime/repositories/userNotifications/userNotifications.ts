import {
  Repository,
  IResponse,
  IUserNotificationsRepository,
  IUserNotificationResponse,
  IUserNotificationOptions,
  IRequestParams,
} from '..';

export class UserNotificationsRepository extends Repository implements IUserNotificationsRepository {
  /**
   *
   * @param userId Mention the id of the user for whose account, the data is being requested, which is subject to necessary permissions
   * @param options
   */
  async get(
    userId: string,
    options?: IUserNotificationOptions | string
  ): Promise<IResponse<IUserNotificationResponse[]> | undefined> {
    const params = typeof options == 'string' ? options : this.mapToRequestParams(options);
    const response = await this.request<IUserNotificationResponse[]>({
      method: 'get',
      path: `users/${userId}/userNotifications`,
      options: { params },
    });
    return response;
  }

  async update(
    userId: string,
    notification: IUserNotificationResponse
  ): Promise<IResponse<IUserNotificationResponse> | undefined> {
    const response = await this.request<IUserNotificationResponse>({
      method: 'patch',
      path: `users/${userId}/userNotifications/${notification.id}`,
      options: { data: notification },
    });
    return response;
  }

  mapToRequestParams(options: IUserNotificationOptions | undefined): IRequestParams {
    const params: IRequestParams = {};
    if (options) {
      if (options.pageLimit) {
        params['page[limit]'] = options.pageLimit.toString();
      }
      if (options.pageCursor) {
        params['page[cursor]'] = options.pageCursor.toString();
      }
      if (options.read) {
        params['read'] = options.read;
      }
      if (options.announcementsOnly) {
        params['announcementsOnly'] = options.announcementsOnly;
      }
      if (options.language) {
        params['language'] = options.language.join(',');
      }
      if (options.userSelectedChannels) {
        params['userSelectedChannels'] = options.userSelectedChannels.join(',');
      }
    }
    return params;
  }
}
