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

const reissueClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isReissueing = false;
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
      if (isReissueing) {
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
      isReissueing = true;

      try {
        const reissueRes = await reissueClient.post("/auth/reissue");
        const newToken: string | undefined = reissueRes.data?.accessToken;

        if (!newToken) {
          throw new Error("No accessToken in reissue response");
        }

        setAccessToken(newToken);
        processQueue(newToken);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (reissueError) {
        processQueue(null);
        clear();
        window.location.href = "/login";
        return Promise.reject(reissueError);
      } finally {
        isReissueing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
