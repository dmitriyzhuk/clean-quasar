import { IRepository, IResponse } from '..';

export interface ISlidesRepository extends IRepository {
  list(): Promise<IResponse<ISlideResponse[]> | undefined>;
}

export interface ISlideResponse {
  id?: string;
  header: string;
  description: string;
  primaryActionUrl: string;
  secondaryActionUrl: string;
  imageUrl: string;
  order: number;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  primaryAction: ButtonActionType;
  secondaryAction: ButtonActionType;
}
export type ButtonActionType = 'GO_TO_COURSE' | 'ENROLL_NOW' | 'GO_TO_URL';
