import { AxiosInstance } from 'axios';

export interface IApiConfig {
  axios: AxiosInstance;
}

export interface IApiRepository {
  init(callback: () => never): Promise<void>;
  axios?: AxiosInstance;
  // badge?: IPrimeBadgeEndpoint;
  // catalog?: IPrimeCatalogEndpoint;
  // learningObject?: IPrimeLearningObjectEndpoint;
  // user?: IPrimeUserEndpoint;
  // account?: IPrimeAccountEndpoint;
}
