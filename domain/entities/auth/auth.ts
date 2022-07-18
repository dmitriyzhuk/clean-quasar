import { IAuth, IAuthData } from '.';

export class Auth implements IAuth {
  accountId = '';
  userId = '';
  userRole = '';
  refreshToken = '';
  accessToken = '';
  expiresIn?: number | undefined;

  constructor(data: IAuthData) {
    Object.assign(this, data);
  }

  validate(): void {
    throw new Error('User Notification message can not be empty.');
  }
}
