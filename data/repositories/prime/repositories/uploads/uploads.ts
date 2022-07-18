/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Repository, IUploadsRepository, IUploadInfoResponse } from '..';

import { AxiosResponse, AxiosRequestConfig } from 'axios';

export class UploadsRepository extends Repository implements IUploadsRepository {
  async info(): Promise<IUploadInfoResponse | undefined> {
    const response = await this.request<IUploadInfoResponse>({
      method: 'get',
      path: 'uploadInfo',
    });
    return response;
  }

  async save(id: string, url: string) {
    const loId = id.split('_')[0];
    const type = id.split(':')[0];
    const data = {
      id: id,
      attributes: {},
    };
    let targetUrl = '';
    if (type === 'certification') {
      targetUrl = `enrollments/${id}`;
      data['type'] = 'learningObjectInstanceEnrollment';
      data.attributes['url'] = url;
    } else {
      targetUrl = `learningObjects/${loId}/loResources/${id}`;
      data['type'] = 'learningObjectResource';
      data.attributes['submissionUrl'] = url;
    }

    const response = await this.request<boolean>({
      method: 'patch',
      path: targetUrl,
      options: { data },
    });

    return response;
  }

  async request<T>(requestData: {
    method: string;
    path: string;
    options?: AxiosRequestConfig;
  }): Promise<T | undefined> {
    try {
      const response: AxiosResponse<T> = await this.axios[requestData.method](requestData.path, requestData.options);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      // this.hadnleError(error);
    }
  }
}
