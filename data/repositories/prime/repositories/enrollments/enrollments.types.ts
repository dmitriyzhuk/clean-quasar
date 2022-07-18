import { IRepository, PageLimitRange, IResponse, LoType, SingleLink } from '..';

export interface IEnrollmentsRepository extends IRepository {
  list(options?: IEnrollmentOptions | string): Promise<IResponse<IEnrollmentResponse[]> | undefined>;
  get(id: string): Promise<IResponse<IEnrollmentResponse> | undefined>;
  create(id: string, instanceId: string): Promise<IResponse<IEnrollmentResponse> | undefined>;
  // listAll(options?: IEnrollmentOptions): Promise<IResponse<IEnrollmentResponse[]> | undefined>;
}

export type EnrollmentStateType = 'ENROLLED' | 'STARTED' | 'COMPLETED' | 'APPROVED' | 'PENDING_APPROVAL';
export type EnrollmentSourceType =
  | 'SELF_ENROLL'
  | 'ADMIN_ENROLL'
  | 'MGR_ENROLL'
  | 'MGR_APPROVAL'
  | 'AUTO_ENROLL'
  | 'LMS_MIGRATION';

export const enrollmentType = 'learningObjectInstanceEnrollment';
export interface IEnrollmentResponse {
  id: string;
  type: typeof enrollmentType;
  attributes: {
    completionDeadline?: string;
    dateCompleted?: string;
    dateStarted?: string;
    dateEnrolled: string;
    enrollmentSource: EnrollmentSourceType;
    hasPassed: boolean;
    progressPercent: number;
    score: number;
    state: EnrollmentStateType;
  };
  relationships: {
    learningObject?: SingleLink;
    loInstance?: SingleLink;
  };
}

export interface IEnrollmentOptions {
  /** Mention any additional model to be tagged along with this model */
  include?: EnrollmentIncludeType[];
  /** Mention the last cursor till the records are fetched */
  pageCursor?: string;
  /** Mention the maximum number of records to be displayed per page. Max allowed is 10 */
  pageLimit?: PageLimitRange;
  /** Mention the maximum number of records to be displayed when fetching all items. Default is 100  */
  maxLimit?: number;
  /** Choose the type of sorting to be applied to the results. */
  sort?: EnrollmentSortType;
  /** Filter by LoType,  LeanerState, tagName etc... */
  filter?: IEnrollmentFilter;
  /** Languages to consider. Ex:- en, fr, ja etc */
}
export interface IEnrollmentFilter {
  /** Choose the filter based on the type of learning object. */
  loTypes?: LoType[];
  /** Choose the filter based on the learner state from the available options. */
  states?: ['active'];
}

export type EnrollmentSortType = 'dateEnrolled' | '-dateEnrolled';

export type EnrollmentIncludeType =
  | 'learningObject'
  | 'loInstance'
  | 'loInstance.loResources'
  | 'loInstance.loResources.resources'
  | 'loInstance.subLoInstances'
  | 'loInstance.subLoInstances.loResources'
  | 'loInstance.subLoInstances.loResources.resources'
  | 'loInstance.subLoInstances.learningObject'
  | 'loInstance.subLoInstances.learningObject.enrollment'
  | 'loInstance.subLoInstances.learningObject.enrollment.loResourceGrades'
  | 'learner'
  | 'loResourceGrades';
