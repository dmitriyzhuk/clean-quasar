import { object, use } from 'rsdi';
import { ErrorMap, AuthMap, UserMap } from 'data/mappers';

export const mappers = {
  ErrorMap: object(ErrorMap),
  AuthMap: object(AuthMap),
  UserMap: object(UserMap).construct(use('apiImageURL')),
};
