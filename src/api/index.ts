import { notification } from "antd";
import axios, { AxiosInstance, RawAxiosRequestHeaders } from "axios";
import { isNetworkError } from "../utils";
axios.interceptors.response.use();

export class ApiInstance {
  private static instance: AxiosInstance;
  private static token: string;

  private constructor() { }
  public static getInstance() {
    if (!this.instance) {
      const headersTemp: RawAxiosRequestHeaders = {
        "Content-Type": "application/json",
      };
      const token = JSON.parse(localStorage.getItem("userInfo") || "{}").token ?? this.token;
      if (token) {
        headersTemp.Authorization = `Bearer ${token}`;
      }
      this.instance = axios.create({
        // baseURL: 'http://35.83.23.14:8081',
        baseURL: 'http://localhost:8081',
        headers: headersTemp,
        withCredentials: false,
      });

      this.instance.interceptors.request.use(
        config => {
            return config;
          },
          error => {
              return Promise.reject(error);
          }
      );

      this.instance.interceptors.response.use(function (response) {
        // Do something with response data
        return response;
      }, function (error) {
        if (isNetworkError(error)) {
          notification.error({
            message: "Network Error",
            description: "Please check your network connection",
          });
          return Promise.reject("error");
        }
        if (error.response?.status === 401 && error.response?.statusText === 'Unauthorized') {
          localStorage.removeItem("userInfo");
          window.location.href = "/login";
          // window.location.reload(); // TODO: update to use react router
        }
        console.log("error", error);
        // Do something with response error
        return Promise.reject(error);
      })
    }
    return this.instance;
  }

  public static setToken(token: string) {
    if (this.instance) {
      this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    this.token = token;
  }

  public static resetToken() {
    this.instance.defaults.headers.common["Authorization"] = '';
  }
}
