import { IRepository, IResponse } from '..';

export interface IMapPointsRepository extends IRepository {
  list(): Promise<IResponse<IMapPointResponse[]> | undefined>;
  listLevels(): Promise<IResponse<IMapPointResponse[]> | undefined>;
}

export interface IMapPointResponse {
  uniqueId?: string;
  adobeId?: string;
  progress: number;
  type: string;
  title: string;
  description: string;
  status: string;
  badge?: string;
}
