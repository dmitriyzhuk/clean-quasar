import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { IAuthResponse, IAuthData, IAuthMobile, ISSOProvider } from './auth.types';
import { Platform } from 'quasar';
import { AxiosInstance } from 'axios';

export default class AuthMobile implements IAuthMobile {
  constructor(public axios: AxiosInstance, public ssoProvider: ISSOProvider) {}

  async authenticate(authLink: string) {
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
  }

  async logout(logoutLink: string) {
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
        }
      });
      browser.on('exit').subscribe(() => {
        setTimeout(resolve, 2000);
      });
    });
    await promise;
  }

  isLogoutComplete(link: string): boolean {
    if (this.ssoProvider) {
      return this.ssoProvider.isLogoutComplete(link);
    }

    return link.indexOf('logout') == -1;
  }
}
