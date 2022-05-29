import {
  IApiRepository,
  MapPointsRepository,
  SlidesRepository,
  UsersRepository,
  PushNotificationsRepository,
  IPushNotificationsRepository,
} from '.';
import { AxiosInstance } from 'axios';

export class ApiRepository implements IApiRepository {
  mapPoints: MapPointsRepository;
  slides: SlidesRepository;
  users: UsersRepository;
  pushNotifications: IPushNotificationsRepository;

  constructor(public axios: AxiosInstance) {
    this.mapPoints = new MapPointsRepository(this.axios);
    this.slides = new SlidesRepository(this.axios);
    this.users = new UsersRepository(this.axios);
    this.pushNotifications = new PushNotificationsRepository(this.axios);
  }

  async init(callback: () => void): Promise<void> {
    // eslint-disable-next-line
    void (await callback.bind(this)());
  }
}
