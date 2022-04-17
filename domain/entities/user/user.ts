import { IUser, IUserData, UserRanks } from './user.types';

export class User implements IUser {
  id = undefined;
  firstname = '';
  lastname = '';
  age = 0;

  constructor(data: IUserData) {
    Object.assign(this, data);
  }

  validate(): boolean {
    return;
  }

  get isAdult(): boolean {
    return this.age >= 10;
  }
}
