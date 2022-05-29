import { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IRepository {
  axios: AxiosInstance;
  hadnleError(error: Error | IResponseError): void;
  request<T>(requestData: {
    method: string;
    path: string;
    options?: AxiosRequestConfig;
  }): Promise<IResponse<T> | undefined>;
}

export interface IResponseError {
  code: string;
  data: string;
}

export interface IResponse<T> {
  data?: T;
  isSuccess?: boolean;
  errors?: IResponseError[];
}

export interface IRequestParams {
  [key: string]: string | number | boolean;
}
