import axiosInstance from "@/services/axios-instance";
import AuthCredentials from "@/types/auth-cred";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Callbacks {
  successFn: (token: AxiosResponse<ApiResponse>) => void;
  errorFn: (error: unknown) => void;
}

type ApiResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

const useLoginMutation = ({ successFn, errorFn }: Callbacks) => {
  return useMutation({
    mutationFn: (data: AuthCredentials) =>
      axiosInstance.post<ApiResponse>("/accounts/auth/token", data),
    onSuccess: (data) => successFn(data),
    onError: (error) => errorFn(error),
  });
};

export default useLoginMutation;
