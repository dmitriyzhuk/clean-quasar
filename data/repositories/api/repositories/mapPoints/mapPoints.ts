import { Repository, IMapPointsRepository, IMapPointResponse, IResponse } from '..';

export class MapPointsRepository extends Repository implements IMapPointsRepository {
  async list(): Promise<IResponse<IMapPointResponse[]> | undefined> {
    const response = await this.request<IMapPointResponse[]>({
      method: 'get',
      path: 'account/check-points',
    });

    return response;
    // if (response?.data) {
    //     //calculate progress
    //     const progressStep = 1 / (response.data.length+1);

    //     return response.data.map( (c: IMapPointResponse, i:number) => {
    //         const mapPointData =  mapResponseToMapPointData(c);

    //         //calculate progress
    //         mapPointData.progress = progressStep * (i+1);

    //         return mapPointData;
    //     });
    // }
  }

  async listLevels(): Promise<IResponse<IMapPointResponse[]> | undefined> {
    const response = await this.request<IMapPointResponse[]>({
      method: 'get',
      path: 'account/levels',
    });

    return response;
  }
}
