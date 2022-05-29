import { ISSOProvider } from '../auth.types';

export class OktaSSOProvider implements ISSOProvider {
  constructor(public primeAccountId: string, public primeApiBaseURL: string) {}

  prepareLink(link: string): string {
    link += '&acap_prime_oauth=1';
    link = `returnPath=${encodeURIComponent(link)}&accountId=${this.primeAccountId}`;
    link = encodeURIComponent(link);
    link = `${this.primeApiBaseURL}splogin?accountId=${this.primeAccountId}&isExternal=true&RelayState=${link}`;

    return link;
  }

  logoutLink(link: string): string {
    return link;
  }

  isLogoutComplete(link: string): boolean {
    return link.indexOf('logoutsession') !== -1;
  }
}
