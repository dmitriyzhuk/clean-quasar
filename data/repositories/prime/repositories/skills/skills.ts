import {
  Repository,
  IResponse,
  ISkillsRepository,
  // ISkillResponse,
  // ISkillInterestResponse,
  IUserSkillResponse,
  // ISkillOptions,
  // ISearchSkillInterestOptions,
  IUserSkillOptions,
  IncludedType,
} from '..';
import { mapUserSkillOptionsToRequestParams, mapLinkToPageOffset } from './skills.map';

export class SkillsRepository extends Repository implements ISkillsRepository {
  // list(options?: ISkillOptions | string): Promise<IResponse<ISkillResponse[]>| undefined>;
  // get(id:string): Promise<IResponse<ISkillResponse> | undefined>;
  // listAll(options?: ISkillOptions): Promise<IResponse<ISkillResponse[]> | undefined>;
  // searchSkillInterest(options:ISearchSkillInterestOptions): Promise<IResponse<ISkillInterestResponse[]>| undefined>;
  // listSkillInterests(options:ISkillInterestOptions): Promise<IResponse<ISkillInterestResponse[]>| undefined>;
  // createSkillInterest(userId: string, id: string, type: SkillInterestType ): Promise<boolean | undefined>;
  // deleteSkillInterest(userId: string, id: string, type: SkillInterestType  ): Promise<boolean | undefined>;
  async listUserSkills(
    userId: string,
    options: IUserSkillOptions
  ): Promise<IResponse<IUserSkillResponse[]> | undefined> {
    const params = typeof options == 'string' ? options : mapUserSkillOptionsToRequestParams(options);
    const response = await this.request<IUserSkillResponse[]>({
      method: 'get',
      path: `users/${userId}/userSkills`,
      options: { params },
    });
    return response;
  }
  // getUserSkills(userId:string, id:string, options: { include: string[] }): Promise<IResponse<IUserSkillResponse[]>| undefined>;

  async listAllUserSkills(
    userId: string,
    options: IUserSkillOptions
  ): Promise<IResponse<IUserSkillResponse[]> | undefined> {
    const data: IUserSkillResponse[] = [];
    const included: IncludedType[] = [];
    let ids: string[] = [];

    if (!options) {
      options = {};
    }

    if (!options.maxLimit) {
      options.maxLimit = 100;
    }

    if (options?.ids) {
      ids = options?.ids;
    }

    while (data.length < options.maxLimit) {
      if (ids.length > 0) {
        options.ids = ids.splice(0, 10);
      }

      const response = await this.listUserSkills(userId, options);
      if (response?.data) {
        data.push(...response.data);
        if (response?.included) included.push(...response.included);

        if (response.links?.next) {
          options.pageOffset = mapLinkToPageOffset(response.links.next);
        } else {
          if (ids.length == 0) break;
        }
      } else {
        if (ids.length == 0) break;
      }
    }

    return { data, included };
  }
}
