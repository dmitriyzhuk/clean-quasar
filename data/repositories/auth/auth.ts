import axios, { AxiosInstance } from 'axios';
import { IAuthRepository, IAuthResponse, IAuthData, ISSOProvider, IAuthMobile } from './auth.types';
import { LocalStorage } from 'quasar';
import { Platform } from 'quasar';

import qs from 'qs';

export class AuthRepository implements IAuthRepository {
  axios: AxiosInstance;
  auth?: IAuthData;
  authMobile?: IAuthMobile;

  constructor(
    public authApiBaseURL: string,
    public primeApiBaseURL: string,
    public primeClientId: string,
    public localStorageName: string = 'AUTH',
    public ssoProvider?: ISSOProvider,
    public mobile: boolean = false,
    public scope: string = 'learner:read,learner:write'
  ) {
    this.axios = axios.create({
      baseURL: this.authApiBaseURL,
    });

    if (this.mobile) {
      const AuthMobile = require('./mobile');
      this.authMobile = new AuthMobile(this.axios, this.ssoProvider);
    }
  }

  async init(): Promise<IAuthData | undefined> {
    console.log('AUTH: init...');

    if (LocalStorage.has(this.localStorageName)) {
      const localAuth = LocalStorage.getItem<IAuthData>(this.localStorageName);
      if (localAuth && localAuth?.access_token) {
        this.auth = await this.refreshToken(localAuth.refresh_token);
      }
    }

    //capture authantication code from prime
    const queryData = qs.parse(location.search.replace('?', ''));
    if (queryData.code) {
      window.history.pushState({}, document.title, location.origin + location.pathname);

      const response = await this.axios.post<IAuthResponse<IAuthData>>('/', {
        code: queryData.code,
      });

      if (response.data?.isSuccess) {
        if (response.data?.data) {
          this.auth = response.data?.data;
          LocalStorage.set(this.localStorageName, response.data?.data);
        }
      }
    }

    return Promise.resolve(this.auth);
  }

  authenticate(): void {
    let authLink =
      `${this.primeApiBaseURL}oauth/o/authorize?` +
      `client_id=${this.primeClientId}&` +
      `redirect_uri=${location.origin}${location.pathname}&` +
      `scope=${this.scope}&` +
      'response_type=CODE';

    if (this.ssoProvider) {
      authLink = this.ssoProvider.prepareLink(authLink);
    }

    if (Platform.is.capacitor && (Platform.is.ios || Platform.is.android)) {
      this.authMobile?.authenticate(authLink);
    } else {
      window.open(authLink, '_self');
    }
  }

  /**
   *
   * RefreshToken method just returns the current access_token. It does not refresh it.
   * There is also no refresh token rotation in place.
   *
   * **Important!**
   * When loging into another client, prime will log you out from here and the
   * refresh token will not be valid at this point.
   * @param token
   * @returns Promise<IAuthData | undefined>
   */
  async refreshToken(token: string): Promise<IAuthData | undefined> {
    console.log('AUTH: trying to refreshToken...');
    try {
      const response = await this.axios.post<IAuthResponse<IAuthData>>('refresh', {
        code: token,
      });

      if (response?.data?.isSuccess) {
        return response.data.isSuccess ? response.data?.data : undefined;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    console.log('AUTH: loging out...');
    LocalStorage.remove(this.localStorageName);

    //clear cookie
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }

    if (this.auth) {
      let logoutLink = `${this.primeApiBaseURL}logout?accountId=${this.auth.account_id}&userId=${this.auth.user_id}`;

      if (this.ssoProvider) {
        logoutLink = this.ssoProvider.logoutLink(logoutLink);
      }

      this.auth = undefined;

      if (Platform.is.capacitor && (Platform.is.ios || Platform.is.android)) {
        this.authMobile?.logout(logoutLink);
      } else {
        window.open(logoutLink);
      }
    }
  }

  getAuth(): IAuthData | undefined {
    return this.auth;
  }
}
