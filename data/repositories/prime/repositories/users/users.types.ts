import { IRepository, IRelationships, PageLimitRange, IResponse } from '..';
import { Locale } from '../..';
export interface IUsersRepository extends IRepository {
  me<IUserFields>(): Promise<IResponse<IUserResponse<IUserFields>> | undefined>;
  get<IUserFields>(id: string): Promise<IResponse<IUserResponse<IUserFields>> | undefined>;
  list<IUserFields>(options: IUserOptions | string): Promise<IResponse<IUserResponse<IUserFields>[]> | undefined>;
}

export interface IUserResponse<IUserFields> {
  id: string;
  type: 'user';
  relationships: IRelationships;
  attributes: {
    avatarUrl: string;
    email: string;
    lastLoginDate: string;
    name: string;
    pointsEarned: number;
    metadata?: {
      alias?: string;
      companyId?: string;
      countryId?: string;
      storeName?: string;
      storeId?: string;
      msRepToken?: string;
      savedAccreditations?: string | string[];
      savedMissions?: string | string[];
      savedResources?: string | string[];
      savedStories?: string | string[];
      seasonPass?: string;
      /**
       * historically it's a key
       */
      theme?: string;
      /**
       * historically titles are here.
       */
      themes?: string;
      termsAccepted?: boolean;
      termsVersion?: string;
      uiLocale?: Locale;
    };
    fields?: IUserFields;
    profile: string;
    roles: string[];
    state: string;
    userType: string;
    uiLocale?: Locale;
    contentLocale?: Locale;
    timeZoneCode?: string;
  };
}

export interface IUserOptions {
  /** Mention any additional model to be tagged along with this model */
  include?: UserIncludeType[];
  /** Mention the starting range value of the records to be displayed in page */
  pageOffset?: number;
  /** Mention the last cursor till the records are fetched */
  pageCursor?: number;
  /** Mention the maximum number of records to be displayed per page. Max allowed is 10 */
  pageLimit?: PageLimitRange;
  /** Mention the maximum number of records to be displayed when fetching all items. Default is 100  */
  maxLimit?: number;
  /** Choose the type of sorting to be applied to the results. */
  sort?: UserSortType;
  /** Choose 'gamification', to fetch 10 users around the user specified by userId. Choose 'gamificationAll', to fetch all users in the scope of the current learner. */
  filter?: UserFilterType;
  /** Mention the id of the user to retrieve data of all the users linked to it with gamification, which is subject to necessary permissions. This field works only if 'gamification' is selected in 'filter' parameter. */
  userId?: string;
  /** Mention users Ids for which data is being requested.filter and userId field can not be selected if this field is mentioned. page[offset] & page[limit] are not honored if this field is mentioned.Max allowed number of ids that can be included is 10 */
  ids?: string[];
}
export type UserSortType = 'id' | '-id' | 'name' | '-name';
export type UserIncludeType = 'user';

export type UserFilterType = 'gamification' | 'gamificationAll';
