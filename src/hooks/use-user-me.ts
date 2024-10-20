import { useGetUserMe } from "@/services/api/user-me-query";
import { User, userSchema } from "@/types/user";
import { useMemo } from "react";

const useUserMe = (): User | undefined => {
  const query = useGetUserMe();
  const userMe = useMemo(() => query?.data?.data, [query.data]);
  if (!userMe) return undefined;
  return userSchema.parse({
    id: userMe.id,
    email: userMe.email,
    firstName: userMe.first_name,
    lastName: userMe.last_name,
    isActive: userMe.is_active,
    registeredAt: new Date(userMe.registered_at),
  });
};

export default useUserMe;
