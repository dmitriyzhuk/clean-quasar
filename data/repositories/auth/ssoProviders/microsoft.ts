import { ISSOProvider } from '../auth.types';

export class MicrosoftSSOProvider implements ISSOProvider {
  constructor(public ssoLoginURI: string) {}

  prepareLink(link: string): string {
    link = this.ssoLoginURI + `&RelayState=${encodeURIComponent(link + '&acap_prime_oauth=1')}`;
    return link;
  }

  logoutLink(link: string): string {
    link = `https://login.microsoftonline.com/common/oauth2/v2.0/logout?
post_logout_redirect_uri=${location.origin + location.pathname}`;
    return link;
  }

  isLogoutComplete(link: string): boolean {
    return link.indexOf('logoutsession') !== -1;
  }
}
