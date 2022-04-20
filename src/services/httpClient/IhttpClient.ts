import { MeApiModel, ExistUserApiModel } from '../../api/models/auth';

export interface IHttpClientRequestParameters<T> {
  url: string;
  requiresToken: boolean;
  payload?: T;
  params?: T;
}

export interface SuccessResponse {
  success: boolean;
}
export interface IHttpClient {
  register<T>(parameters: IHttpClientRequestParameters<T>): Promise<MeApiModel>;
  login<T>(parameters: IHttpClientRequestParameters<T>): Promise<MeApiModel>;
  checkExistingUser<T>(parameters: IHttpClientRequestParameters<T>): Promise<ExistUserApiModel>;
  forgotPassword<T>(parameters: IHttpClientRequestParameters<T>): Promise<SuccessResponse>;
  resetPassword<T>(parameters: IHttpClientRequestParameters<T>): Promise<SuccessResponse>;
  logout(): Promise<any>;
  get<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U>;
  post<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U>;
  patch<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U>;
  put<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U>;
  delete<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U>;
  handleExpiredJwt(): Promise<any>;
  getAccessToken(): string | null;
  getRefreshToken(): string | null;
  isLoggedIn(): boolean;
}
