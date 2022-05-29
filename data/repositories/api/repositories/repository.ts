/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IRepository, IResponse } from '.';
import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

export class Repository implements IRepository {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async request<T>(requestData: {
    method: string;
    path: string;
    options?: AxiosRequestConfig;
    data?: unknown;
  }): Promise<IResponse<T> | undefined> {
    try {
      const response: AxiosResponse<IResponse<T>> = await this.axios[requestData.method](
        requestData.path,
        requestData.data || requestData.options
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      this.hadnleError(error);
    }
  }

  hadnleError(error): void {
    if (error.response) {
      // client received an error response (5xx, 4xx)
      if (error.response.data.error) {
        throw new Error(`Prime Error: ${error.response.data.error}`);
      }
      if (error.response.data.title) {
        throw new Error(`Prime Error: ${error.response.data.title}`);
      }
    } else if (error.request) {
      // client never received a response, or request never left
    } else {
      // anything else
    }

    throw error;
  }
}
