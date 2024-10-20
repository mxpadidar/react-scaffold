import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axiosInstance from "../axios-instance";

type UpdateUserMeResponse = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  registration_date: string;
};

type UpdateUserMeRequest = {
  first_name: string;
  last_name: string;
};

interface Callbacks {
  successFn: (data: AxiosResponse<UpdateUserMeResponse>) => void;
  errorFn: (error: unknown) => void;
}

const useUpdateUserMeMutation = ({ successFn, errorFn }: Callbacks) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: UpdateUserMeRequest) =>
      axiosInstance.put<UpdateUserMeResponse>("/accounts/me", data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      successFn(data);
    },
    onError: (error) => errorFn(error),
  });
  return mutation;
};

export default useUpdateUserMeMutation;
