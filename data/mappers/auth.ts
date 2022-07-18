import { IAuthData, IAuth, Auth } from 'domain/entities';
import { IAuthData as IAuthResponse } from '../repositories/auth';

export class AuthMap {
  toDomain(data: IAuthData): IAuth {
    const userNotification = new Auth(data);
    userNotification.validate();
    return userNotification;
  }

  toData(data: IAuthResponse): IAuthData {
    return {
      accountId: data.account_id,
      userId: data.user_id,
      userRole: data.user_role,
      refreshToken: data.refresh_token,
      accessToken: data.access_token,
      expiresIn: data.expires_in,
    };
  }
}
