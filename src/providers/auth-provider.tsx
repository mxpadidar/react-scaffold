import useGetUserMeApi from "@/services/api/get-user-me-api";
import useSignInApi from "@/services/api/sign-in-api";
import { removeTokenCookie, setTokenCookie } from "@/services/token-service";
import AuthCredentials from "@/types/auth-cred";
import User from "@/types/user";
import { createContext, useEffect, useState } from "react";

export interface AuthContextType {
  user?: User;
  signedIn: boolean;
  signIn: (data: AuthCredentials) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const loginMutation = useSignInApi({
    successFn: (data) => {
      setTokenCookie(data);
      setSignedIn(true);
    },
    errorFn: (error) => console.error(error),
  });

  const userData = useGetUserMeApi();

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [signedIn, userData]);

  const signIn = (data: AuthCredentials) => {
    loginMutation.mutate(data);
  };

  const signOut = () => {
    removeTokenCookie();
    setSignedIn(false);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ signedIn, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
