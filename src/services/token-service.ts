import { DOMAIN } from "@/settings";
import Token from "@/types/token";

import Cookies from "js-cookie";

export const setTokenCookie = (token: Token) => {
  const jsonToken = JSON.stringify(token);
  Cookies.set("token", jsonToken, {
    expires: 1 / 24,
    domain: DOMAIN,
    sameSite: "None",
    secure: true,
  });
};

export const getTokenCookie = (): Token | null => {
  const token = Cookies.get("token");
  if (token) {
    try {
      return JSON.parse(token);
    } catch (error) {
      console.error("Failed to parse token from cookies:", error);
      return null;
    }
  }
  return null;
};

export const removeTokenCookie = () => {
  Cookies.remove("token", {
    domain: DOMAIN,
    sameSite: "None",
    secure: true,
  });
};
