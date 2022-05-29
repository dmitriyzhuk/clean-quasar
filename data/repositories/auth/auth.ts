import axios, { AxiosInstance } from 'axios';
import { IAuthRepository, IAuthResponse, IAuthData, ISSOProvider } from './auth.types';
import { LocalStorage } from 'quasar';
import { Platform } from 'quasar';
import qs from 'qs';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';

export class AuthRepository implements IAuthRepository {
  axios: AxiosInstance;
  auth?: IAuthData;

  constructor(
    public authApiBaseURL: string,
    public primeApiBaseURL: string,
    public primeClientId: string,
    public localStorageName: string = 'AUTH',
    public ssoProvider?: ISSOProvider,
    public scope: string = 'learner:read,learner:write'
  ) {
    this.axios = axios.create({
      baseURL: this.authApiBaseURL,
    });
  }

  async init(): Promise<boolean> {
    if (LocalStorage.has(this.localStorageName)) {
      const localAuth = LocalStorage.getItem<IAuthData>(this.localStorageName);
      if (localAuth && localAuth.access_token) {
        this.auth = await this.refreshToken(localAuth.refresh_token);
      }
    }

    if (!this.auth) {
      const auth = await this.authenticate();
      if (auth) {
        this.auth = auth;

        LocalStorage.set(this.localStorageName, auth);
      }
    }

    return Promise.resolve(!!this.auth);
  }

  async authenticate(): Promise<IAuthData | undefined> {
    const queryData = qs.parse(location.search.replace('?', ''));

    if (queryData.code) {
      window.history.pushState({}, document.title, location.origin + location.pathname);

      const response = await this.axios.post<IAuthResponse<IAuthData>>('prime-auth-api', {
        code: queryData.code,
      });
      if (response.data?.isSuccess) {
        return response.data?.isSuccess ? response.data?.data : undefined;
      }
    } else {
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
        const promise = new Promise<IAuthData | undefined>((resolve, reject) => {
          const browser = InAppBrowser.create(authLink, '_blank', 'toolbar=no');
          browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
            //window should close when reaching the final link like http://localhost:8080/?PRIME_BASE=https://captivateprimeeu.adobe.com&code=32d9708b96c950666e00204632873153
            if (event.url.indexOf('adobe.com&code') >= 0) {
              const splitUrl = event.url.split('code=');
              if (Platform.is.android) {
                browser.close();
              }
              if (Platform.is.ios) {
                setTimeout(() => browser.close(), 0);
              }
              window.history.pushState({}, document.title, location.origin + location.pathname);

              this.axios
                .post<IAuthResponse<IAuthData>>('prime-auth-api', {
                  code: splitUrl[1],
                })
                .then((response) => {
                  if (response.data.isSuccess) {
                    resolve(response.data.data);
                  } else {
                    resolve(undefined);
                  }
                })
                .catch(() => {
                  reject();
                });
            }
          });
        });
        const response = await promise;
        return response;
      } else {
        window.open(authLink, '_self');
      }

      return Promise.reject();
    }
  }

  async refreshToken(token: string): Promise<IAuthData | undefined> {
    console.log('trying to refreshToken...');
    try {
      const response = await this.axios.post<IAuthResponse<IAuthData>>('prime-auth-api/refresh', {
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
    console.log('loging out...');
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

      if (Platform.is.capacitor && (Platform.is.ios || Platform.is.android)) {
        const browser = InAppBrowser.create(logoutLink, '_blank', 'toolbar=no');
        const promise = new Promise<void>((resolve, reject) => {
          browser.on('loaderror').subscribe(() => {
            reject();
          });
          browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
            //window should close on seeing a link without 'logout' like this: https://captivateprimeeu.adobe.com/dausuat
            if (this.isLogoutComplete(event.url)) {
              setTimeout(() => {
                if (Platform.is.android) {
                  browser.close();
                }
                if (Platform.is.ios) {
                  setTimeout(() => browser.close(), 0);
                }
              }, 10000);
              this.auth = undefined;
            }
          });
          browser.on('exit').subscribe(() => {
            setTimeout(resolve, 2000);
          });
        });
        await promise;
      } else {
        window.open(logoutLink, '_self');
      }
    }
  }

  getAuth(): IAuthData | undefined {
    return this.auth;
  }

  isLogoutComplete(link: string): boolean {
    if (this.ssoProvider) {
      return this.ssoProvider.isLogoutComplete(link);
    }

    return link.indexOf('logout') == -1;
  }
}
