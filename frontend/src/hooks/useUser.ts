import { useQuery } from "@tanstack/react-query";

export const fetchUserStatus = async () => {
  const response = await fetch("/api/user/verifyUser");
  return response.json();
};

export const useUserStatus = () => {
  const query = useQuery({ queryKey: ["user"], queryFn: fetchUserStatus });
  return query;
};
