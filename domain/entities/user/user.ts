import { IUser, IUserData, UserRanks } from './user.types';

export class User implements IUser {
  id = '';
  image = '';
  email = '';
  uiLanguage = '';
  contentLanguage = '';
  name = '';
  alias = '';
  title = '';
  timezone = '';
  pointsEarned = 0;
  roles: string[] = [];
  role = 'Learner';
  profile = '';

  constructor(data: IUserData) {
    Object.assign(this, data);
  }

  validate(): void {
    return;
  }

  get rank(): UserRanks {
    if (this.pointsEarned < 1500) return UserRanks.Beginner;
    if (this.pointsEarned < 2500) return UserRanks.Bronze;
    if (this.pointsEarned < 3500) return UserRanks.Silver;
    if (this.pointsEarned < 5000) return UserRanks.Gold;
    return UserRanks.Platinum;
  }

  get maxPoints(): number {
    if (this.pointsEarned < 1500) return 1500;
    if (this.pointsEarned < 2500) return 2500;
    if (this.pointsEarned < 3500) return 3500;
    if (this.pointsEarned < 5000) return 5000;
    return this.pointsEarned;
  }

  get progess(): number {
    return Math.round((this.pointsEarned / this.maxPoints) * 100);
  }
}
