import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { logout } from "@/utils/user";

export const fetchUserStatus = async () => {
  const response = await fetch("/api/user/verifyUser");
  const data = await response.json();
  if (data.message === "Refresh token is expired") {
    toast.error("Token has expired please re-login");
    logout({ showToast: false });
    return { message: "token expired", success: false, isAuthenticated: false };
  } else {
    if (data.message === "Access token refreshed") {
      const response2 = await fetch("/api/user/verifyUser");
      const data2 = await response2.json();
      return await data2;
    } else {
      return data;
    }
  }
};

export const useUserStatus = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserStatus,
  });

  return query;
};
