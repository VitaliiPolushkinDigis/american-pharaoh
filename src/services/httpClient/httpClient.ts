import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IHttpClient, IHttpClientRequestParameters, SuccessResponse } from './IhttpClient';
import { HttpStatusCode } from '../../api/HttpStatusCodes';
import { ErrorMessages } from '../../api/constants';
import { AuthEndpoints } from '../../api/endpoints';
import {
  MeApiModel,
  AuthRequestBody,
  ExistUserApiModel,
  ExistUserRequestBody,
} from '../../api/models/auth';

class HttpClient implements IHttpClient {
  register<T>(parameters: IHttpClientRequestParameters<T | AuthRequestBody>): Promise<MeApiModel> {
    return new Promise<MeApiModel>((resolve, reject) => {
      const { url, payload } = parameters;

      axios
        .post(url, payload)
        .then((response: AxiosResponse<MeApiModel>) => {
          localStorage.setItem('authToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('userId', response.data.user.id);
          resolve(response.data);
        })
        .catch((error) => {
          if (
            error?.response?.status === HttpStatusCode.Unauthorized &&
            error?.response?.data?.error === ErrorMessages.Unauthorized
          ) {
            return this.handleExpiredJwt()
              .then(() =>
                this.get<T, MeApiModel>(parameters as IHttpClientRequestParameters<T>).then(
                  (response) => {
                    resolve(response);
                  },
                ),
              )
              .catch(() => reject(error));
          }
          reject(error);
        });
    });
  }

  login<T>(parameters: IHttpClientRequestParameters<T | AuthRequestBody>): Promise<MeApiModel> {
    return new Promise<MeApiModel>((resolve, reject) => {
      const { url, payload } = parameters;

      axios
        .post(url, payload)
        .then((response: AxiosResponse<MeApiModel>) => {
          localStorage.setItem('authToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('userId', response.data.user.id);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  checkExistingUser<T>(
    parameters: IHttpClientRequestParameters<T | ExistUserRequestBody>,
  ): Promise<ExistUserApiModel> {
    return new Promise<ExistUserApiModel>((resolve, reject) => {
      const { url, payload } = parameters;

      axios
        .post(url, payload)
        .then((response: AxiosResponse<ExistUserApiModel>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  forgotPassword<T>(parameters: IHttpClientRequestParameters<T>): Promise<SuccessResponse> {
    return new Promise<SuccessResponse>((resolve, reject) => {
      const { url, payload } = parameters;

      axios
        .post(url, payload)
        .then((response: AxiosResponse<SuccessResponse>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  resetPassword<T>(parameters: IHttpClientRequestParameters<T>): Promise<SuccessResponse> {
    return new Promise<SuccessResponse>((resolve, reject) => {
      const { url, payload } = parameters;

      axios
        .post(url, payload)
        .then((response: AxiosResponse<SuccessResponse>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  logout(): Promise<any> {
    return new Promise<void>((resolve) => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      resolve();
    });
  }

  get<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U> {
    return new Promise<U>((resolve, reject) => {
      const { url, requiresToken, params } = parameters;

      const options: AxiosRequestConfig = {
        headers: {},
      };

      if (requiresToken) {
        options.headers['X-AUTH-TOKEN'] = this.getAccessToken();
      }

      if (params) {
        options.params = params;
      }

      axios
        .get(url, options)
        .then((response: AxiosResponse<U>) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (
            error?.response?.status === HttpStatusCode.Unauthorized &&
            error?.response?.data?.error === ErrorMessages.Unauthorized
          ) {
            return this.handleExpiredJwt()
              .then(() =>
                this.get<T, U>(parameters).then((response) => {
                  resolve(response);
                }),
              )
              .catch(() => reject(error));
          }
          reject(error);
        });
    });
  }

  post<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U> {
    return new Promise<U>((resolve, reject) => {
      const { url, payload, requiresToken } = parameters;

      const options: AxiosRequestConfig = {
        headers: {},
      };

      if (requiresToken) {
        options.headers['X-AUTH-TOKEN'] = this.getAccessToken();
      }

      axios
        .post(url, payload, options)
        .then((response: AxiosResponse<U>) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (
            error.status === HttpStatusCode.Unauthorized &&
            error.error === ErrorMessages.Unauthorized
          ) {
            return this.handleExpiredJwt()
              .then(() => this.post<T, U>(parameters))
              .then((response) => {
                resolve(response);
              })
              .catch(() => reject(error));
          }
          reject(error);
        });
    });
  }

  patch<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U> {
    return new Promise<U>((resolve, reject) => {
      const { url, payload, requiresToken } = parameters;

      const options: AxiosRequestConfig = {
        headers: {},
      };

      if (requiresToken) {
        options.headers['X-AUTH-TOKEN'] = this.getAccessToken();
      }

      axios
        .patch(url, payload, options)
        .then((response: AxiosResponse<U>) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (
            error.status === HttpStatusCode.Unauthorized &&
            error.error === ErrorMessages.Unauthorized
          ) {
            return this.handleExpiredJwt()
              .then(() => this.patch<T, U>(parameters))
              .then((response) => {
                resolve(response);
              })
              .catch(() => reject(error));
          }
          reject(error);
        });
    });
  }

  put<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U> {
    return new Promise<U>((resolve, reject) => {
      const { url, payload, requiresToken } = parameters;

      const options: AxiosRequestConfig = {
        headers: {},
      };

      if (requiresToken) {
        options.headers['X-AUTH-TOKEN'] = this.getAccessToken();
      }

      axios
        .put(url, payload, options)
        .then((response: AxiosResponse<U>) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (
            error.status === HttpStatusCode.Unauthorized &&
            error.error === ErrorMessages.Unauthorized
          ) {
            return this.handleExpiredJwt()
              .then(() => this.put<T, U>(parameters))
              .then((response) => {
                resolve(response);
              })
              .catch(() => reject(error));
          }
          reject(error);
        });
    });
  }

  delete<T, U>(parameters: IHttpClientRequestParameters<T>): Promise<U> {
    return new Promise<U>((resolve, reject) => {
      const { url, requiresToken } = parameters;

      const options: AxiosRequestConfig = {
        headers: {},
      };

      if (requiresToken) {
        options.headers['X-AUTH-TOKEN'] = this.getAccessToken();
      }

      axios
        .delete(url, options)
        .then((response: AxiosResponse<U>) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (
            error.status === HttpStatusCode.Unauthorized &&
            error.error === ErrorMessages.Unauthorized
          ) {
            return this.handleExpiredJwt()
              .then(() => this.delete<T, U>(parameters))
              .then((response) => {
                resolve(response);
              })
              .catch(() => reject(error));
          }
          reject(error);
        });
    });
  }

  handleExpiredJwt(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      const options: AxiosRequestConfig = {
        headers: {},
      };
      options.headers['x-refresh-token'] = this.getRefreshToken();
      return axios
        .post(AuthEndpoints.RefreshToken, {}, options)
        .then((response: AxiosResponse<MeApiModel>) => {
          localStorage.setItem('authToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('userId', response.data.user.id);
          resolve();
        })
        .catch(() => {
          this.logout();
          reject();
        });
    });
  }

  getAccessToken() {
    return `Bearer ${localStorage.getItem('authToken')}`;
  }

  getRefreshToken() {
    return `Bearer ${localStorage.getItem('refreshToken')}`;
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  isLoggedIn() {
    return !!localStorage.getItem('authToken');
  }
}

export const httpClient = new HttpClient();
