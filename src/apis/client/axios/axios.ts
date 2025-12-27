import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { AuthStore } from "@/stores/auth.store";

const BASE_URL =
  import.meta.env.VITE_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

const { getAccessToken, setAccessToken, clear } = AuthStore.actions;

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let pendingQueue: Array<(token: string | null) => void> = [];

const processQueue = (token: string | null) => {
  pendingQueue.forEach((cb) => cb(token));
  pendingQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const response = error.response;
    const originalRequest = error.config as RetryableRequestConfig;

    if (!response) {
      return Promise.reject(error);
    }

    if (response.status === 401 && originalRequest && originalRequest._retry) {
      clear();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (response.status === 401) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push((newToken) => {
            if (!newToken) {
              reject(error);
              return;
            }
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshRes = await refreshClient.post("/auth/refresh");
        const newToken: string | undefined = refreshRes.data?.accessToken;

        if (!newToken) {
          throw new Error("No accessToken in refresh response");
        }

        setAccessToken(newToken);
        processQueue(newToken);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(null);
        clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
