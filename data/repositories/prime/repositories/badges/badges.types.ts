import { IRepository, SingleLink, PageLimitRange, IResponse } from '..';

export interface IBadgesRepository extends IRepository {
  list(options?: IBadgeOptions | string): Promise<IResponse<IBadgeResponse[]> | undefined>;
  get(id: string): Promise<IResponse<IBadgeResponse> | undefined>;
  listUserBadges(
    userId: string,
    options?: IBadgeOptions | string
  ): Promise<IResponse<IUserBadgeResponse[]> | undefined>;
  getUserBadge(
    userId: string,
    id: string,
    options?: { include: BadgeIncludeType[] }
  ): Promise<IResponse<IUserBadgeResponse> | undefined>;
}

export const badgeType = 'badge';
export interface IBadgeResponse {
  id: string;
  type: typeof badgeType;
  attributes: {
    imageUrl: string;
    name: string;
    state: string;
  };
}

export const userBadgeType = 'userBadge';
export interface IUserBadgeResponse {
  id: string;
  type: typeof userBadgeType;
  attributes: {
    assertionUrl?: string;
    dateAchieved?: string;
    modelType: string;
  };
  relationships: {
    badge: SingleLink;
    learner: SingleLink;
    model: SingleLink;
  };
}

export interface IBadgeOptions {
  /** Mention any additional model to be tagged along with this model */
  include?: BadgeIncludeType[];
  /** Mention the starting range value of the records to be displayed in page */
  pageOffset?: number;
  /** Mention the maximum number of records to be displayed per page. Max allowed is 10 */
  pageLimit?: PageLimitRange;
  /** Mention the maximum number of records to be displayed when fetching all items. Default is 100  */
  maxLimit?: number;
  /** Choose the type of sorting to be applied to the results. */
  sort?: BadgeSortType;
  /** Mention badge ids for which data is being requested.Max allowed number of ids that can be included is 10 */
  ids?: string[];
}

export type BadgeSortType = 'dateAchieved' | '-dateAchieved';

export type BadgeIncludeType = 'badge' | 'model';
