import User from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios-instance";

const useGetUserMeApi = () => {
  const query = useQuery<User>({
    queryKey: ["users", "me"],
    queryFn: async () => {
      const response = await axiosInstance.get("/accounts/me");
      return {
        id: response.data.id,
        email: response.data.email,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
      };
    },
  });

  return query.data;
};

export default useGetUserMeApi;
