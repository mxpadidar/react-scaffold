import useLoginMutation from "@/services/api/login-mutation";
import {
  clearToken,
  getAccessToken,
  saveToken,
} from "@/services/token-service";
import AuthCredentials from "@/types/auth-cred";
import { tokenSchema } from "@/types/token";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useState } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = getAccessToken();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!accessToken
  );

  const queryClient = useQueryClient();

  const loginMutation = useLoginMutation({
    successFn: (response) => {
      const token = tokenSchema.parse({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        tokenType: response.data.token_type,
      });
      saveToken(token);
      setIsAuthenticated(true);
    },
    errorFn: (error) => console.error("login error", error),
  });

  const login = (data: AuthCredentials) => loginMutation.mutate(data);

  const logout = () => {
    clearToken();
    setIsAuthenticated(false);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
