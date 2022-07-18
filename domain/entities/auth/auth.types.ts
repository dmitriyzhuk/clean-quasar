export interface IAuth extends IAuthData {
  validate(): void;
}

export interface IAuthData {
  accountId: string;
  userId: string;
  userRole: string;
  refreshToken: string;
  accessToken: string;
  expiresIn?: number;
}
