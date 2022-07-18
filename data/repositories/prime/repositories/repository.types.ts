import { Locale } from '../';
import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import {
  ILearningObjectResponse,
  ILearningObjectResourceResponse,
  ILearningObjectInstanceResponse,
  ILearningObjectResourceGradeResponse,
  ILearningObjectNoteResponse,
  learningObjectType,
  learningObjectResourceType,
  learningObjectInstanceType,
  learningObjectResourceGradeType,
  learningObjectNoteType,
} from './learningObjects';
import { IEnrollmentResponse, enrollmentType } from './enrollments';
import { IBadgeResponse, IUserBadgeResponse, badgeType, userBadgeType } from './badges';
import {
  ISkillResponse,
  ISkillLevelResponse,
  IUserSkillResponse,
  skillType,
  skillLevelType,
  userSkillType,
} from './skills';

export interface IRepository {
  axios: AxiosInstance;
  hadnleError(error: Error | IResponseError): IResponseError;
  request<T>(requestData: {
    method: string;
    path: string;
    options?: AxiosRequestConfig;
  }): Promise<IResponse<T> | undefined>;
}

export interface IResponse<T> {
  data?: T;
  included?: IncludedType[];
  isSuccess?: boolean;
  error?: IResponseError;
  links?: {
    self: string;
    next?: string;
  };
}

export interface IResponseError {
  type: ResponseErrorType;
  message: string;
  error: Error | AxiosError | unknown;
}

export type ResponseErrorType = 'domain' | 'notFound' | 'network' | 'request' | 'server' | 'unauthorized' | 'unknown';

export interface IRequestParams {
  [key: string]: string | number | boolean;
}

export interface IRelationships {
  authors?: MultiLink;
  enrollment?: SingleLink;
  instances?: MultiLink;
  skills?: MultiLink;
  subLOs?: MultiLink;
  account?: SingleLink;
  manager?: SingleLink;
  learningObject?: SingleLink;
  loInstance?: SingleLink;
  resources?: MultiLink;
  loResource?: SingleLink;
  loResources?: MultiLink;
  badge?: SingleLink;
  learner?: SingleLink;
  model?: SingleLink;
  skill?: SingleLink;
  skillLevel?: SingleLink;
}

export const resourceType = 'resource';
export interface IResource {
  id: string;
  type: typeof resourceType;
  relationships?: IRelationships;
  attributes: {
    localizedMetadata: ILocalizedMetadata[];
    imageUrl: boolean;
    authorDesiredDuration?: number;
    contentType: 'VIDEO' | 'PDF';
    contentZipSize: number;
    contentZipUrl: string;
    dateCreated: string;
    desiredDuration: number;
    hasQuiz: boolean;
    hasToc: boolean;
    isDefault: boolean;
    locale: Locale;
    location: string;
    name: string;
    onlyQuiz: boolean;
    reportingInfo: string;
    reportingType: string;
  };
}

export interface MultiLink {
  data: LinkData[];
}

export interface LinkData {
  id: string;
  type: string;
}

export interface SingleLink {
  data: LinkData;
}

export interface ILocalizedMetadata {
  description?: string;
  locale?: Locale;
  name?: string;
  overview?: string;
  richTextOverview?: string;
}

export type PageLimitRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type IncludedType =
  | IEnrollmentResponse
  | IBadgeResponse
  | IUserBadgeResponse
  | ISkillLevelResponse
  | ISkillResponse
  | IUserSkillResponse
  | IResource
  | ILearningObjectResourceResponse
  | ILearningObjectResponse
  | ILearningObjectResourceGradeResponse
  | ILearningObjectInstanceResponse
  | ILearningObjectNoteResponse;

export const guards = {
  isBadge: (item: IncludedType): item is IBadgeResponse => item.type == badgeType,
  isUserBadge: (item: IncludedType): item is IUserBadgeResponse => item.type == userBadgeType,
  isSkill: (item: IncludedType): item is ISkillResponse => item.type == skillType,
  isSkillLevel: (item: IncludedType): item is ISkillLevelResponse => item.type == skillLevelType,
  isUserSkill: (item: IncludedType): item is IUserSkillResponse => item.type == userSkillType,
  isLearningObject: (item: IncludedType): item is ILearningObjectResponse => item.type == learningObjectType,
  isEnrollment: (item: IncludedType): item is IEnrollmentResponse => item.type === enrollmentType,
  isGrade: (item: IncludedType): item is ILearningObjectResourceGradeResponse =>
    item.type === learningObjectResourceGradeType,
  isInstance: (item: IncludedType): item is ILearningObjectInstanceResponse => item.type === learningObjectInstanceType,
  isResource: (item: IncludedType): item is ILearningObjectResourceResponse => item.type === learningObjectResourceType,
  isResourceData: (item: IncludedType): item is IResource => item.type === resourceType,
  isNote: (item: IncludedType): item is ILearningObjectNoteResponse => item.type === learningObjectNoteType,
};
