import { Token } from "@/types/token";

export const saveToken = (token: Token): void => {
  localStorage.setItem("accessToken", token.accessToken);
  localStorage.setItem("refreshToken", token.refreshToken);
};

export const clearToken = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getAccessToken = (): string | undefined => {
  return localStorage.getItem("accessToken") || undefined;
};

export const getRefreshToken = (): string | undefined => {
  return localStorage.getItem("refreshToken") || undefined;
};
