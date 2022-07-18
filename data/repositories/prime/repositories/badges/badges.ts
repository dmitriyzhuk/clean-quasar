import {
  Repository,
  IResponse,
  IBadgesRepository,
  IBadgeResponse,
  IUserBadgeResponse,
  IBadgeOptions,
  BadgeIncludeType,
  IncludedType,
} from '..';
import { mapBadgeOptionsToRequestParams, mapLinkToPageOffset } from './badges.map';

export class BadgesRepository extends Repository implements IBadgesRepository {
  async list(options?: string | IBadgeOptions): Promise<IResponse<IBadgeResponse[]> | undefined> {
    const params = typeof options == 'string' ? options : mapBadgeOptionsToRequestParams(options);
    const response = await this.request<IBadgeResponse[]>({
      method: 'get',
      path: 'badges',
      options: { params },
    });
    return response;
  }
  async get(id: string): Promise<IResponse<IBadgeResponse> | undefined> {
    const response = await this.request<IBadgeResponse>({
      method: 'get',
      path: `badges/${id}`,
    });
    return response;
  }

  async listAll(options?: IBadgeOptions): Promise<IResponse<IBadgeResponse[]> | undefined> {
    const data: IBadgeResponse[] = [];
    const included: IncludedType[] = [];

    if (!options) {
      options = {};
    }
    if (!options?.maxLimit) {
      options.maxLimit = 100;
    }
    if (!options?.pageOffset) {
      options.pageOffset = 0;
    }
    while (data.length < options.maxLimit) {
      const response = await this.list(options);

      if (response?.included) included.push(...response.included);
      if (response?.data) {
        data.push(...response.data);

        //TODO: includes

        if (response.links?.next) {
          options.pageOffset = mapLinkToPageOffset(response.links.next);
        } else {
          break;
        }
      } else {
        break;
      }
    }

    return {
      data,
      included,
    };
  }

  async listUserBadges(
    userId: string,
    options?: string | IBadgeOptions
  ): Promise<IResponse<IUserBadgeResponse[]> | undefined> {
    const params = typeof options == 'string' ? options : mapBadgeOptionsToRequestParams(options);
    const response = await this.request<IUserBadgeResponse[]>({
      method: 'get',
      path: `users/${userId}/userBadges`,
      options: { params },
    });
    return response;
  }
  async getUserBadge(
    userId: string,
    id: string,
    options?: { include: BadgeIncludeType[] }
  ): Promise<IResponse<IUserBadgeResponse> | undefined> {
    const params = typeof options == 'string' ? options : mapBadgeOptionsToRequestParams(options);
    const response = await this.request<IUserBadgeResponse>({
      method: 'get',
      path: `users/${userId}/userBadges/${id}`,
      options: { params },
    });
    return response;
  }

  async listAllUserBadges(
    userId: string,
    options?: IBadgeOptions
  ): Promise<IResponse<IUserBadgeResponse[]> | undefined> {
    const data: IUserBadgeResponse[] = [];
    const included: IncludedType[] = [];

    if (!options) {
      options = {};
    }
    if (!options?.maxLimit) {
      options.maxLimit = 100;
    }
    if (!options?.pageOffset) {
      options.pageOffset = 0;
    }
    while (data.length < options.maxLimit) {
      const response = await this.listUserBadges(userId, options);

      if (response?.included) included.push(...response.included);
      if (response?.data) {
        data.push(...response.data);

        //TODO: includes

        if (response.links?.next) {
          options.pageOffset = mapLinkToPageOffset(response.links.next);
        } else {
          break;
        }
      } else {
        break;
      }
    }

    return {
      data,
      included,
    };
  }
}
