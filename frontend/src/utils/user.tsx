import { toast } from "react-toastify";
import { logout as logoutState } from "@/store/Auth.slice";
import { store } from "@/store/Store";
interface LogoutUtilParam {
  msg?: string;
  showToast?: boolean;
}

export const logout = async ({
  msg,
  showToast = true,
}: LogoutUtilParam = {}) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/api/user/logout`,
    { credentials: "include" }
  );
  const data = await response.json();
  if (data.success) {
    if (showToast) {
      toast.success(msg || data.message);
    }
    store.dispatch(logoutState());
  } else {
    toast.error("Logout failed");
  }
  return await data;
};
