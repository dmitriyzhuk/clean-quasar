import {
  IPrimeRepository,
  LearningObjectsRepository,
  UserNotificationsRepository,
  UsersRepository,
  BadgesRepository,
  SkillsRepository,
  EnrollmentsRepository,
  UploadsRepository,
} from '.';
import { AxiosInstance } from 'axios';

export class PrimeRepository implements IPrimeRepository {
  learningObjects: LearningObjectsRepository;
  userNotifications: UserNotificationsRepository;
  users: UsersRepository;
  badges: BadgesRepository;
  skills: SkillsRepository;
  enrollments: EnrollmentsRepository;
  uploads: UploadsRepository;

  constructor(public axios: AxiosInstance) {
    this.learningObjects = new LearningObjectsRepository(this.axios);
    this.userNotifications = new UserNotificationsRepository(this.axios);
    this.users = new UsersRepository(this.axios);
    this.badges = new BadgesRepository(this.axios);
    this.skills = new SkillsRepository(this.axios);
    this.enrollments = new EnrollmentsRepository(this.axios);
    this.uploads = new UploadsRepository(this.axios);
  }

  async init(callback: () => void): Promise<void> {
    // eslint-disable-next-line
    void (await callback.bind(this)());
  }
}
