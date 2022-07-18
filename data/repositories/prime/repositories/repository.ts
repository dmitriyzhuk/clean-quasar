/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IRepository, IResponse, IResponseError } from '.';
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { ResponseErrorType } from './repository.types';

export abstract class ResponseError implements IResponseError {
  type: ResponseErrorType = 'unknown';
  message = 'Unknown error. Please retry';
  error: unknown = '';
}

export class Repository implements IRepository {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async request<T>(requestData: {
    method: string;
    path: string;
    options?: AxiosRequestConfig;
  }): Promise<IResponse<T> | undefined> {
    try {
      const response: AxiosResponse<IResponse<T>> = await this.axios[requestData.method](
        requestData.path,
        requestData.options
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error: Error | AxiosError | unknown) {
      throw this.hadnleError(error);
    }
  }

  hadnleError(error: Error | AxiosError | unknown): IResponseError {
    if (axios.isAxiosError(error)) {
      // Error 😨
      if (error.response) {
        /*
         * The request was made and the ser ver responded with a
         * status code that falls out of the range of 2xx
         */
        // console.log(error.response.data);

        if (
          error.response.status === 401 ||
          (error.response.status === 400 &&
            error.response.data &&
            error.response.data.source &&
            error.response.data.source.info === 'Invalid token')
        ) {
          return {
            type: 'unauthorized',
            message: 'You session has expired',
            error: error,
          };
        }

        if (error.response.status >= 500 && error.response.status < 600) {
          return {
            type: 'server',
            message: 'We are experiencing difficulties with the server',
            error: error,
          };
        }

        if (error.message === 'Network Error' || error.message.includes('timeout')) {
          return {
            type: 'network',
            message: 'You are experiencing difficulties with the network',
            error: error,
          };
        }

        if (
          error.response.status === 400 &&
          error.response?.data?.source?.info === 'Deadline crossed for unenrollment'
        ) {
          return {
            type: 'domain',
            message: 'Deadline crossed for unenrollment',
            error: error,
          };
        }

        if (error.response.status === 400 && error.response?.data?.code === 'OBJECT_DOESNT_EXIST') {
          return {
            type: 'notFound',
            message: `Learning Object ${error.response?.data?.source?.info || ''} does not exist.`,
            error: error,
          };
        }

        return {
          type: 'unknown',
          message: error.response?.data?.source?.info || '',
          error: error,
        };
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        if (error.code == 'ECONNABORTED') {
          console.log(error.message);
        } else {
          return {
            type: 'request',
            message: 'There seems to be something wrong with the request',
            error: error,
          };
        }
      } else {
        // Something happened in setting up the request and triggered an Error
        // console.log('Error', error.message);
        return {
          type: 'unknown',
          message: 'Unknown error. Please retry',
          error,
        };
      }
    }

    return {
      type: 'unknown',
      message: 'Unknown error. Please retry',
      error,
    };
  }
}

// export function parseError(error: AxiosError): ApiError {

//   if (error.message === 'Network Error' || error.message.includes('timeout')) {
//     return { type: 'network', error };
//   }
//   if (!error.response) return { type: 'network', error };
//   const status = error.response.status;
//   if (status >= 300 && status < 500) {
//     return { type: 'request', error };
//   }
//   if (status >= 500 && status < 600) {
//     return { type: 'server', error };
//   }
//   return { type: 'unknown', error };
// }

// export const errorHandler = (error: AxiosError) => {
//   const status = get<string>(error.response, 'data.source.info');

//   if (error.response.status !== 401 && status !== 'Invalid token') {
//     return new Promise((resolve, reject) => {
//       reject(error);
//     });
//   }

//   if (error.response.message === 'Account is disabled.') {
//     Token.clear();

//     return new Promise((resolve, reject) => {
//       reject(error);
//     });
//   }
