import axiosInstance from "@/services/axios-instance";
import AuthCredentials from "@/types/auth-cred";
import Token from "@/types/token";
import { useMutation } from "@tanstack/react-query";

interface ApiCallbacks {
  successFn: (data: Token) => void;
  errorFn: (error: unknown, variables: AuthCredentials) => void;
}

const useSignInApi = ({ successFn, errorFn }: ApiCallbacks) => {
  const mutation = useMutation({
    mutationFn: async (data: AuthCredentials) => {
      const {
        data: { access_token, refresh_token, token_type },
      } = await axiosInstance.post("/accounts/auth/token", data);
      return {
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenType: token_type,
      };
    },
    onSuccess: (data: Token) => successFn(data),
    onError: (error, variables) => errorFn(error, variables as AuthCredentials),
  });
  return mutation;
};

export default useSignInApi;
