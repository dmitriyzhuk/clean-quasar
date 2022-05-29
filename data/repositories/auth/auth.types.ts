export interface IAuthRepository {
  init();
  authenticate(): Promise<IAuthData | undefined>;
  refreshToken(token: string): Promise<IAuthData | undefined>;
  logout(): void;
  getAuth(): IAuthData | undefined;
}

export interface IAuthResponse<T> {
  data?: T;
  isSuccess?: boolean;
}

export interface IAuthData {
  account_id: string;
  user_id: string;
  user_role: string;
  refresh_token: string;
  access_token: string;
  expires_in?: number;
}

export interface ISSOProvider {
  prepareLink(link: string): string;
  logoutLink(link: string): string;
  isLogoutComplete(link: string): boolean;
}
