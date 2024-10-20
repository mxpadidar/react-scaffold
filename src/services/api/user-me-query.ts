import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios-instance";

type ApiResponse = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  registered_at: string;
};

export const useGetUserMe = () =>
  useQuery({
    queryKey: ["users", "me"],
    queryFn: async () => axiosInstance.get<ApiResponse>("/accounts/me"),
  });
