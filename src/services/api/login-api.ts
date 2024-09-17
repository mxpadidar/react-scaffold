import axiosInstance from "@/services/axios-instance";
import AuthCredentials from "@/types/auth-cred";
import Token from "@/types/token";
import { useMutation } from "@tanstack/react-query";

interface ApiCallbacks {
  successFn: (data: Token) => void;
  errorFn: (error: unknown, variables: AuthCredentials) => void;
}

const useLoginApi = ({ successFn, errorFn }: ApiCallbacks) => {
  const mutation = useMutation({
    mutationFn: async (data: AuthCredentials) => {
      const response = await axiosInstance.post("/accounts/auth/token", {
        ...data,
      });
      return response.data;
    },
    onSuccess: (data: Token) => successFn(data),
    onError: (error, variables) => errorFn(error, variables as AuthCredentials),
  });
  return mutation;
};

export default useLoginApi;
