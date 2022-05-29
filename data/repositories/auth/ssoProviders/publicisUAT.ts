import { ISSOProvider } from '../auth.types';

export class PublicisUATSSOProvider implements ISSOProvider {
  constructor(public ssoLoginBaseURL: string, public primeAccountId: string, public primeApiBaseURL: string) {}

  prepareLink(link: string): string {
    const joiner = this.ssoLoginBaseURL.includes('?') ? '&' : '?';

    link =
      this.ssoLoginBaseURL +
      `${joiner}RPID=${encodeURIComponent(this.primeApiBaseURL.replace(/\/$/, ''))}` +
      `&RelayState=${encodeURIComponent(
        `returnPath=${encodeURIComponent(`${link}&acap_prime_oauth=1`)}` + `&accountId=${this.primeAccountId}`
      )}`;

    return link;
  }

  logoutLink(link: string): string {
    return link;
  }

  isLogoutComplete(link: string): boolean {
    return link.indexOf('logoutsession') !== -1;
  }
}
