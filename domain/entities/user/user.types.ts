export interface IUser extends IUserData {
  validate(): void;
  rank: UserRanks;
  maxPoints: number;
  progess: number;
}

export interface IUserData {
  id?: string;
  firstname: string;
  lastname: string;
  age: number;
}

export type IUserGroup = IUserGroupData;

export interface IUserGroupData {
  id: string;
  dateCreated: string;
  description: string;
  name: string;
  readOnly: boolean;
  state: string;
  userCount: number;
}

export interface IUserAvatarData {
  id: number;
  imageUrl: string;
}

export interface IUserFields {
  country: string;
}
export enum UserRoles {
  Learner = 'Learner',
}

export enum UserRanks {
  Beginner = 'beginner',
  Bronze = 'bronze',
  Silver = 'silver',
  Gold = 'gold',
  Platinum = 'platinum',
}
