import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

interface Result<T = any> {
  code: number;
  success: boolean;
  message: string;
  result: T;
}
export class AppAxios {
  private instance: AxiosInstance;
  private readonly options: AxiosRequestConfig;
  constructor(options: AxiosRequestConfig) {
    this.instance = axios.create(options);
    this.options = options;
    this.setupInterceptors();
  }
  private setupInterceptors() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }
  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
  request<T = any>(options: AxiosRequestConfig): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<Result>>(options)
        .then((res: AxiosResponse<Result>) => {
          res.data.success = res.data.code === 200;
          resolve(res.data);
        })
        .catch((err: Error | AxiosError) => {
          console.error(err);
          reject(err);
        });
    });
  }
  get<T = any>(url: string, data?: any, options?: AxiosRequestConfig): Promise<Result<T>> {
    return this.request({ ...options, method: 'GET', url, params: data });
  }
  delete<T = any>(url: string, data?: any, options?: AxiosRequestConfig): Promise<Result<T>> {
    return this.request({ ...options, method: 'DELETE', url, params: data });
  }
  post<T = any>(url: string, data?: any, options?: AxiosRequestConfig): Promise<Result<T>> {
    return this.request({ ...options, method: 'POST', url, data });
  }
  put<T = any>(url: string, data?: any, options?: AxiosRequestConfig): Promise<Result<T>> {
    return this.request({ ...options, method: 'PUT', url, data });
  }
}
