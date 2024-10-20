import { Token, tokenSchema } from "@/types/token";
import settings from "@/utils/settings";
import axios from "axios";
import {
  clearToken,
  getAccessToken,
  getRefreshToken,
  saveToken,
} from "./token-service";

const axiosInstance = axios.create({
  baseURL: settings.BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let redirectToSignIn: () => void;

export const setRedirectToSignIn = (callback: () => void) => {
  redirectToSignIn = callback;
};

// Add a request interceptor to include the access token in the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken: string): Promise<Token> => {
  const response = await axios.post(
    `${settings.BACKEND_BASE_URL}/accounts/auth/token/refresh`,
    { refresh_token: refreshToken }
  );

  const token = tokenSchema.parse({
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
    tokenType: response.data.token_type,
  });

  return token;
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearToken();
        redirectToSignIn();
        return Promise.reject("Refresh token not found");
      }

      try {
        const token = await refreshAccessToken(refreshToken);
        if (!token) {
          redirectToSignIn();
          return Promise.reject("Failed to refresh access token");
        }
        saveToken(token);
        originalRequest.headers.Authorization = `Bearer ${token.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
);

export default axiosInstance;
