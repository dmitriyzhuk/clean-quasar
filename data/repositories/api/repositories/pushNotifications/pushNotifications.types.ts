import { IRepository, IResponse } from '..';

export interface IPushNotificationsRepository extends IRepository {
  // list(): Promise<IResponse<{ data: IPushNotificationResponse[]; totalItems: number }> | undefined>;
  registerDevice(data: IPushNotificationsDeviceRequest): Promise<IResponse<boolean> | undefined>;
  list(): Promise<IResponse<IPushNotificationResponse[]> | undefined>;
  get(id: string): Promise<IResponse<IPushNotificationResponse> | undefined>;
  create(data: IPushNotificationResponse): Promise<IResponse<IPushNotificationResponse> | undefined>;
  edit(id: string, data: IPushNotificationResponse): Promise<IResponse<IPushNotificationResponse> | undefined>;
  send(id: string): Promise<IResponse<IPushNotificationResponse> | undefined>;
  delete(id: string): Promise<IResponse<boolean> | undefined>;
}

export interface IPushNotificationResponse {
  id?: string;
  title: string;
  description: string;
  // imageUrl?: string;
  contentLocale: string;
  // userGroups: string[];
  // status: PushNotificationStatusType;
  status: string;
  date?: string;
}

export interface IPushNotificationsDeviceRequest {
  deviceId: string;
  platform: PushNotificationPlatformType;
}
export type PushNotificationStatusType = 'sent' | 'draft' | 'error';
export type PushNotificationPlatformType = 'ios' | 'android' | 'web';
