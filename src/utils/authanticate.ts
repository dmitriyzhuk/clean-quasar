import { container } from 'setup/di';
import { IAuthData } from 'domain/entities';
import { AxiosInstance } from 'axios';

export const authanticate = async (auth: IAuthData): Promise<void> => {
  const primeAxios = container.get<AxiosInstance>('PrimeAxios');
  primeAxios.defaults.headers.common['Authorization'] = `oauth ${auth.accessToken}`;

  const apiAxios = container.get<AxiosInstance>('ApiAxios');
  apiAxios.defaults.headers.common['Authorization'] = `oauth ${auth.accessToken}`;
};
