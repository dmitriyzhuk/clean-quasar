import { Repository, IResponse, ISlidesRepository, ISlideResponse } from '..';

export class SlidesRepository extends Repository implements ISlidesRepository {
  async list(): Promise<IResponse<ISlideResponse[]> | undefined> {
    const response = await this.request<ISlideResponse[]>({
      method: 'get',
      path: 'slides',
    });

    return response;
  }
}
