import {
  Repository,
  IResponse,
  ILearningObjectsRepository,
  ILearningObjectResponse,
  ILearningObjectOptions,
  LearningObjectIncludeType,
  ILearningObjectNoteResponse,
  IncludedType,
} from '..';
import { mapLearningObjectOptionsToRequestParams, mapLinkToPageCursor } from './learningObjects.map';

export class LearningObjectsRepository extends Repository implements ILearningObjectsRepository {
  async list(options?: ILearningObjectOptions | string): Promise<IResponse<ILearningObjectResponse[]> | undefined> {
    const params = typeof options == 'string' ? options : mapLearningObjectOptionsToRequestParams(options);
    const response = await this.request<ILearningObjectResponse[]>({
      method: 'get',
      path: 'learningObjects',
      options: { params },
    });
    return response;
  }

  async get(
    id: string,
    options?: { include: LearningObjectIncludeType[] }
  ): Promise<IResponse<ILearningObjectResponse> | undefined> {
    const params = typeof options == 'string' ? options : mapLearningObjectOptionsToRequestParams(options);
    const response = await this.request<ILearningObjectResponse>({
      method: 'get',
      path: `learningObjects/${id}`,
      options: { params },
    });
    return response;
  }

  async listAll(options?: ILearningObjectOptions): Promise<IResponse<ILearningObjectResponse[]> | undefined> {
    const data: ILearningObjectResponse[] = [];
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
      if (ids) {
        options.ids = ids.splice(0, 10);
      }
      const response = await this.list(options);

      if (response?.data) {
        data.push(...response.data);
        if (response?.included) included.push(...response.included);

        if (response.links?.next) {
          options.pageCursor = mapLinkToPageCursor(response.links.next);
        } else {
          if (ids.length == 0) break;
        }
      } else {
        if (ids.length == 0) break;
      }
    }

    return {
      data,
      included,
    };
  }

  async listNotes(
    id: string,
    options?: { include: LearningObjectIncludeType[] }
  ): Promise<IResponse<ILearningObjectNoteResponse[]> | undefined> {
    const params = typeof options == 'string' ? options : mapLearningObjectOptionsToRequestParams(options);
    const response = await this.request<ILearningObjectNoteResponse[]>({
      method: 'get',
      path: `/learningObjects/${id}/note`,
      options: { params },
    });
    return response;
  }
}
