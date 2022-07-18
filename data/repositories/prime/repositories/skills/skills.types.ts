import { IRepository, IRelationships, PageLimitRange, IResponse } from '..';

export interface ISkillsRepository extends IRepository {
  // list(options?: ISkillOptions | string): Promise<IResponse<ISkillResponse[]>| undefined>;
  // get(id:string): Promise<IResponse<ISkillResponse> | undefined>;
  // listAll(options?: ISkillOptions): Promise<IResponse<ISkillResponse[]> | undefined>;
  // searchSkillInterest(options:ISearchSkillInterestOptions): Promise<IResponse<ISkillInterestResponse[]>| undefined>;
  // listSkillInterests(options:ISkillInterestOptions): Promise<IResponse<ISkillInterestResponse[]>| undefined>;
  // createSkillInterest(userId: string, id: string, type: SkillInterestType ): Promise<boolean | undefined>;
  // deleteSkillInterest(userId: string, id: string, type: SkillInterestType  ): Promise<boolean | undefined>;
  listUserSkills(userId: string, options: IUserSkillOptions): Promise<IResponse<IUserSkillResponse[]> | undefined>;
  // getUserSkills(userId:string, id:string, options: { include: string[] }): Promise<IResponse<IUserSkillResponse[]>| undefined>;
}

export const skillType = 'skill';
export interface ISkillResponse {
  id: string;
  type: typeof skillType;
  attributes: {
    description: string;
    name: string;
    state: skillStateType;
  };
  relationships: IRelationships;
}

export type skillStateType = 'Active' | 'Retired';
export const skillLevelType = 'skillLevel';
export interface ISkillLevelResponse {
  id: string;
  type: typeof skillLevelType;
  attributes: {
    level: number;
    maxCredits: number;
    name: string;
  };
  relationships: IRelationships;
}
export const skillInterestType = 'skillInterest';
export interface ISkillInterestResponse {
  id: string;
  type: typeof skillInterestType;
  attributes: {
    name?: string;
    dateCreated?: string;
    source?: string;
  };
  relationships: IRelationships;
}
export const userSkillType = 'userSkill';
export interface IUserSkillResponse {
  id: string;
  type: typeof userSkillType;
  attributes: {
    dateAchieved: string;
    dateCreated: string;
    pointsEarned: number;
  };
  relationships: IRelationships;
}

export interface ISkillOptions {
  /** Mention any additional model to be tagged along with this model */
  include?: SkillIncludeType[];
  /** Mention the starting range value of the records to be displayed in page */
  pageOffset?: number;
  /** Mention the maximum number of records to be displayed per page. Max allowed is 10 */
  pageLimit?: PageLimitRange;
  /** Mention the maximum number of records to be displayed when fetching all items. Default is 100  */
  maxLimit?: number;
  /** Choose the type of sorting to be applied to the results. */
  sort?: 'name' | '-name';
  /** Mention Skill Ids for which data is being requested. page[offset] & page[limit] are not honored if this field is mentioned.Max allowed number of ids that can be included is 10 */
  ids?: string[];
  /** TBD. */
  filter?: {
    /** TBD. */
    excludeSkillInterest?: string;
  };
}

type SkillIncludeType =
  | 'instances'
  | 'enrollment'
  | 'supplementaryResources'
  | 'subLOs'
  | 'subLOs.enrollment'
  | 'prerequisiteLOs'
  | 'skills'
  | 'skills.skillLevel'
  | 'skills.skillLevel.badge'
  | 'skills.skillLevel.skill'
  | 'enrollment.learnerBadge.badge'
  | 'instances.badge'
  | 'enrollment.loResourceGrades'
  | 'enrollment.loInstance'
  | 'enrollment.loInstance.loResources'
  | 'enrollment.loInstance.loResources.resources'
  | 'enrollment.loInstance.subLoInstances'
  | 'enrollment.loInstance.subLoInstances.loResources'
  | 'enrollment.loInstance.subLoInstances.loResources.resources'
  | 'enrollment.loInstance.subLoInstances.learningObject'
  | 'enrollment.loInstance.subLoInstances.learningObject.enrollment'
  | 'enrollment.loInstance.subLoInstances.learningObject.enrollment.loResourceGrades'
  | 'instances.loResources.resources'
  | 'skills.skillLevel';

export interface ISearchSkillInterestOptions {
  /** Mention the starting range value of the records to be displayed in page */
  pageCursor?: number;
  /** Mention the maximum number of records to be displayed per page. Max allowed is 10 */
  pageLimit?: PageLimitRange;
  /** Mention the maximum number of records to be displayed when fetching all items. Default is 100  */
  maxLimit?: number;
  /** Mention Skill Ids for which data is being requested. page[offset] & page[limit] are not honored if this field is mentioned.Max allowed number of ids that can be included is 10 */
  nameStartsWith?: string;
  /** Choose a skill interest type. AdminDefined and IndustryAligned are supported */
  filter: {
    skillInterestTypes: SkillInterestType;
  };
}

export type SkillInterestType = 'ADMIN_DEFINED' | 'INDUSTRY_ALIGNED';

export interface ISkillInterestOptions {
  /** Mention any additional model to be tagged along with this model */
  include?: SkillIncludeType[];
  /** Mention the starting range value of the records to be displayed in page */
  pageOffset?: number;
  /** Mention the maximum number of records to be displayed per page. Max allowed is 10 */
  pageLimit?: PageLimitRange;
  /** Mention the maximum number of records to be displayed when fetching all items. Default is 100  */
  maxLimit?: number;
  /** Choose the type of sorting to be applied to the results. */
  sort?: 'dateCreated' | '-dateCreated';
  /** The id of the user for whose account, the data is being requested */
  userId: string;
  /** Choose a skill interest type. AdminDefined and IndustryAligned are supported */
  filter: {
    skillInterestTypes: SkillInterestType;
  };
}

export interface IUserSkillOptions {
  /** Mention any additional model to be tagged along with this model */
  include?: UserSkillIncludeType[];
  /** Mention the starting range value of the records to be displayed in page */
  pageOffset?: number;
  /** Mention the maximum number of records to be displayed per page. Max allowed is 10 */
  pageLimit?: PageLimitRange;
  /** Mention the maximum number of records to be displayed when fetching all items. Default is 100  */
  maxLimit?: number;
  /** Choose the type of sorting to be applied to the results. */
  sort?: 'dateAchieved' | '-dateAchieved';
  /** Mention UserSkill Ids for which data is being requested.Max allowed number of ids that can be included is 10 */
  ids?: string[];
}

type UserSkillIncludeType =
  | 'skill'
  | 'skill.levels'
  | 'skillLevel'
  | 'skillLevel.skill'
  | 'skillLevel.badge'
  | 'learnerBadge'
  | 'learningObject'
  | 'user';
