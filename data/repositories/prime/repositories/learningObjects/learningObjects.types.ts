import { IRepository, IRelationships, IResource, ILocalizedMetadata, PageLimitRange, IResponse } from '..';

export interface ILearningObjectsRepository extends IRepository {
  list(options?: ILearningObjectOptions | string): Promise<IResponse<ILearningObjectResponse[]> | undefined>;
  get(
    id: string,
    options?: { include: LearningObjectIncludeType[] }
  ): Promise<IResponse<ILearningObjectResponse> | undefined>;
  listAll(options?: ILearningObjectOptions): Promise<IResponse<ILearningObjectResponse[]> | undefined>;
}

export const learningObjectType = 'learningObject';
export interface ILearningObjectResponse {
  id: string;
  type: typeof learningObjectType;
  relationships?: IRelationships;
  resources?: IResource[];
  attributes: {
    authorNames?: string[];
    dateCreated?: string;
    datePublished?: string;
    dateUpdated?: string;
    duration?: number;
    authorDesiredDuration?: number;
    effectiveModifiedDate?: string;
    effectivenessIndex?: number;
    enrollmentType?: LoEnrollmentType; // manager nominated, manager approved, self enrolled - 1997823/ LP 79768
    hasOptionalLoResources: boolean;
    imageUrl?: string;
    isExternal?: boolean;
    isPrerequisiteEnforced: boolean;
    isSubLoOrderEnforced?: boolean;
    loType?: LoType;
    moduleResetEnabled?: boolean;
    state?: string;
    tags?: string[];
    uniqueId?: string;
    localizedMetadata?: ILocalizedMetadata[];
    url?: string;
    unenrollmentAllowed: boolean;
  };
}

export type LoEnrollmentType = 'Admin Enroll' | 'Self Enroll' | 'Manager Approval';

export const learningObjectInstanceType = 'learningObjectInstance';
export interface ILearningObjectInstanceResponse {
  id: string;
  type: typeof learningObjectInstanceType;
  relationships: IRelationships;
  attributes: {
    completionDeadline?: string;
    enrollmentDeadline?: string;
    dateCreated: string;
    isDefault: boolean;
    isFlexible: false;
    state: LoInstanceStateType;
    localizedMetadata: ILocalizedMetadata[];
  };
}

export type LoInstanceStateType = 'Active' | 'Retired';

export const learningObjectResourceType = 'learningObjectResource';
export interface ILearningObjectResourceResponse {
  id: string;
  type: typeof learningObjectResourceType;
  relationships?: IRelationships;
  attributes: {
    loResourceType: LoResourceType;
    externalReporting: boolean;
    resourceType: string;
    resourceSubType: 'NONE' | 'SUBMISSION';
    submissionEnabled: boolean;
    version: number;
    mandatory?: boolean;
    localizedMetadata: ILocalizedMetadata[];
  };
}

export const learningObjectResourceGradeType = 'learningObjectResourceGrade';
export interface ILearningObjectResourceGradeResponse {
  id: string;
  type: typeof learningObjectResourceGradeType;
  relationships: IRelationships;
  attributes: {
    dateStarted: string;
    duration: number;
    hasPassed: boolean;
    progressPercent: number;
    score: number;
  };
}

export const learningObjectNoteType = 'note';
export interface ILearningObjectNoteResponse {
  id: string;
  type: typeof learningObjectNoteType;
  relationships: IRelationships;
  attributes: {
    marker?: string;
    text: string;
  };
}

export type LoResourceType = 'Content' | 'Test Out' | 'Pre Work';

export interface ILearningObjectOptions {
  /** Mention any additional model to be tagged along with this model */
  include?: LearningObjectIncludeType[];
  /** Mention the last cursor till the records are fetched */
  pageCursor?: number;
  /** Mention the maximum number of records to be displayed per page. Max allowed is 10 */
  pageLimit?: PageLimitRange;
  /** Mention the maximum number of records to be displayed when fetching all items. Default is 100  */
  maxLimit?: number;
  /** Choose the type of sorting to be applied to the results. */
  sort?: LearningObjectSortType;
  /** Filter by LoType,  LeanerState, tagName etc... */
  filter?: ILearningObjectFilter;
  /** Languages to consider. Ex:- en, fr, ja etc */
  language?: string[];
  /** Mention learningObjects Ids for which data is being requested. page[offset] & page[limit] are not honored if this field is mentioned.Max allowed number of ids that can be included is 10 */
  ids?: string[];
}
export interface ILearningObjectFilter {
  /** Choose the filter based on the type of learning object. */
  loTypes?: LoType[];
  /** Choose the filter based on the learner state from the available options. */
  learnerState?: LearningObjectLearnerStateType[];
  /** Mention the catalog ids to filter the result from */
  catalogIds?: ReadonlyArray<string>;
  /** Mention the exact tag name to filter results. */
  tagName?: string[];
  /** Mention the exact skill name to filter results. */
  skillName?: string[];
  /** Mention duration ranges separated by comma e.g. "filter.duration.range=0-200,300-1200". */
  durationRange?: string[];
  /** Mention one or more delivery types to apply as a filter */
  loFormat?: LoFormatType[];
  /** Set filter.ignoreHigherOrderLOEnrollment=true to list courses which are part of higher order LO and learner is enrolled. Default value is false which indicates courses part of higher ordre LO and where learner is not enrolled will not be listed */
  ignoreHigherOrderLOEnrollment?: boolean;
  /** Set filter.ignoreEnhancedLP=false to list enhanced learning programs, default value is true. */
  ignoreEnhancedLP?: boolean;
}

export type LearningObjectLearnerStateType = 'enrolled' | 'completed' | 'started' | 'notenrolled';
export type LearningObjectSortType =
  | 'name'
  | '-name'
  | 'date'
  | '-date'
  | 'dueDate'
  | 'effectiveness'
  | 'dateCreated'
  | '-dateCreated'
  | 'dateEnrolled'
  | '-dateEnrolled'
  | 'rating'
  | '-rating';

export type LearningObjectIncludeType =
  | 'instances'
  | 'enrollment'
  | 'supplementaryResources'
  | 'subLOs'
  | 'subLOs.enrollment'
  | 'subLOs.instances.loResources'
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
  | 'instances.loResources'
  | 'instances.loResources.resources'
  | 'skills.skillLevel';

export type LoFormatType = 'ACTIVITY' | 'BLENDED' | 'CLASSROOM' | 'SELF PACED' | 'VIRTUAL CLASSROOM';

export type LoType = 'course' | 'learningProgram' | 'jobAid' | 'certification';
