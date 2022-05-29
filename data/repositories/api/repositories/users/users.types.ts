import { IRepository, IResponse } from '..';

export interface IUsersRepository extends IRepository {
  list(options: IUserOptions | string): Promise<IResponse<IUserResponse[]> | undefined>;
}

export interface IUserResponse {
  id?: number;
  imageUrl: string;
  avatarQuery?: string;
  avatarSettings?: string;
}

export interface IUserOptions {
  ids: string[];
}

export interface IUserUpdateRequest {
  imageBase64: string;
  avatarQuery: string;
  avatarSettings: string;
}

export interface IAvatarQuery {
  sex: 'Male' | 'Female';
  options: {
    Female: IAvatarOption;
    Male: IAvatarOption;
  };
}

export interface IAvatarOption {
  label: string;
  variants?: [unknown];
  Accessories: IMultipleType;
  Eyes: ISingleType;
  Hair: ISingleType;
  Hats: ISingleType;
  MaleBody?: ISingleType;
  MaleGlasses?: ISingleType;
  FemaleBody?: ISingleType;
  FemaleGlasses?: ISingleType;
  MaleHair?: ISingleType;
  Mouth: ISingleType;
  Nose: ISingleType;
}

export interface ISingleType {
  type: string;
}

export interface IMultipleType {
  type: string[];
}
// interface IVariant {
//   label: string;
//   component: string;
//   prop: 'type';
//   tab: string;
//   values: [IValueType];
// }

// interface IValueType {
//   '[name]': string;
//   '[value]': string;
// }
