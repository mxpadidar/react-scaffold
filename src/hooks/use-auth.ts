import { AuthContext } from "@/providers/auth-provider";
import { User } from "@/schemas/user-schema";
import AuthCredentials from "@/types/auth-cred";
import { useContext } from "react";
import useUserMe from "./use-user-me";

interface AuthType {
  user: User | undefined;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => void;
  logout: () => void;
}

const useAuth = (): AuthType => {
  const context = useContext(AuthContext);

  const user = useUserMe();

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return { ...context, user };
};

export default useAuth;
