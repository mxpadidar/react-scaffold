import useLoginApi from "@/services/api/login-api";
import { removeTokenCookie, setTokenCookie } from "@/services/token-service";
import AuthCredentials from "@/types/auth-cred";
import User from "@/types/user";
import { createContext, useState } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | undefined;
  login: (data: AuthCredentials) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const loginMutation = useLoginApi({
    successFn: (data) => {
      setTokenCookie(data);
      setIsAuthenticated(true);
    },
    errorFn: (error) => {
      console.error(error);
    },
  });

  const login = (data: AuthCredentials) => {
    loginMutation.mutate(data);
  };

  const logout = () => {
    setUser(undefined);
    setIsAuthenticated(false);
    removeTokenCookie();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
