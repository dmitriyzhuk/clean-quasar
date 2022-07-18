import {
  Repository,
  IResponse,
  IEnrollmentsRepository,
  IEnrollmentResponse,
  IEnrollmentOptions,
  EnrollmentIncludeType,
  IncludedType,
} from '..';
import {
  mapEnrollmentOptionsToRequestParams,
  mapLinkToPageCursor,
  // mapToEnrollmentData
} from './enrollments.map';

export class EnrollmentsRepository extends Repository implements IEnrollmentsRepository {
  async list(options?: IEnrollmentOptions | string): Promise<IResponse<IEnrollmentResponse[]> | undefined> {
    const params = typeof options == 'string' ? options : mapEnrollmentOptionsToRequestParams(options);
    const response = await this.request<IEnrollmentResponse[]>({
      method: 'get',
      path: 'enrollments',
      options: { params },
    });
    return response;
  }

  async get(
    id: string,
    options?: { include: EnrollmentIncludeType[] } | string
  ): Promise<IResponse<IEnrollmentResponse> | undefined> {
    const params = typeof options == 'string' ? options : mapEnrollmentOptionsToRequestParams(options);
    const response = await this.request<IEnrollmentResponse>({
      method: 'get',
      path: `enrollments/${id}`,
      options: { params },
    });
    return response;
  }

  async create(id: string, instanceId: string): Promise<IResponse<IEnrollmentResponse> | undefined> {
    const response = await this.request<IEnrollmentResponse>({
      method: 'post',
      path: `enrollments?loId=${id}&loInstanceId=${instanceId}`,
    });

    return response;
  }

  async delete(id: string): Promise<IResponse<IEnrollmentResponse> | undefined> {
    const response = await this.request<IEnrollmentResponse>({
      method: 'delete',
      path: `enrollments/${id}`,
    });

    return response;
  }

  async listAll(options?: IEnrollmentOptions): Promise<IResponse<IEnrollmentResponse[]> | undefined> {
    const data: IEnrollmentResponse[] = [];
    const included: IncludedType[] = [];

    if (!options) {
      options = {};
    }
    if (!options.maxLimit) {
      options.maxLimit = 100;
    }
    while (data.length < options.maxLimit) {
      const response = await this.list(options);

      if (response?.data) {
        data.push(...response.data);
        if (response?.included) included.push(...response.included);

        if (response.links?.next) {
          options.pageCursor = mapLinkToPageCursor(response.links.next);
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
