import { API_BASE_URL } from '@/constants/config';
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

export interface ApiResponse<T> {
  data: T;
  status: string;
  message: string;
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    // const token = await SecureStore.getItemAsync('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.log('Unauthorized access, redirecting to login');
      // logout();
    }
    return Promise.reject(error);
  }
);

function parseApiData<T>(response: AxiosResponse<ApiResponse<T>>): T {
  if (response.data.status === 'success') {
    return response.data.data;
  }
  throw new Error(response.data.message || 'Unknown error occurred');
}

export const client = {
  get: <Response>(url: string, config: AxiosRequestConfig = {}) =>
    axiosInstance
      .get<ApiResponse<Response>>(url, config)
      .then(response => parseApiData(response)),

  post: <Body, Response>(
    url: string,
    body: Body,
    config: AxiosRequestConfig = {}
  ) => {
    const payload = {
      requestData: body,
    };
    return axiosInstance
      .post<ApiResponse<Response>>(url, payload, config)
      .then(response => parseApiData(response));
  },

  postDirectPayload: <Body, Response>(
    url: string,
    body: Body,
    config: AxiosRequestConfig = {}
  ) => {
    return axiosInstance
      .post<ApiResponse<Response>>(url, body, config)
      .then(response => parseApiData(response));
  },

  patch: <Body, Response>(
    url: string,
    body: Body,
    config: AxiosRequestConfig = {}
  ) => {
    const payload = {
      requestData: body,
    };
    return axiosInstance
      .patch<ApiResponse<Response>>(url, payload, config)
      .then(response => parseApiData(response));
  },

  put: <Body, Response>(
    url: string,
    body: Body,
    config: AxiosRequestConfig = {}
  ) => {
    const payload = {
      requestData: body,
    };
    return axiosInstance
      .put<ApiResponse<Response>>(url, payload, config)
      .then(response => parseApiData(response));
  },

  delete: <Response>(url: string, config: AxiosRequestConfig = {}) =>
    axiosInstance
      .delete<ApiResponse<Response>>(url, config)
      .then(response => parseApiData(response)),
};
