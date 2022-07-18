import { IUserData, IUserFields, IUser, User } from 'domain/entities';
import { IUserResponse } from '../repositories/prime';
import { IUserResponse as IApiUserResponse } from '../repositories/api';

export class UserMap {
  constructor(public apiImageURL: string) {}

  toDomain(data: IUserData): IUser {
    const user = new User(data);
    user.validate();
    return user;
  }

  toData(data: IUserResponse<IUserFields>, apiUser?: IApiUserResponse): IUserData {
    return {
      id: data.id,
      image: this.toFullImageUrl(apiUser?.imageUrl) || data.attributes.avatarUrl,
      email: data.attributes.email,
      uiLanguage: data.attributes.uiLocale,
      contentLanguage: data.attributes.contentLocale,
      name: data.attributes.name,
      alias: data.attributes.name,
      title: '',
      timezone: '',
      roles: data.attributes.roles,
      pointsEarned: data?.attributes?.pointsEarned,
      profile: data?.attributes?.profile,
      role: 'Learner',
    };
  }

  toFullImageUrl(imageUrl?: string): string | undefined {
    if (imageUrl) return `${this.apiImageURL}${imageUrl}`;
  }
}
