import { toast } from "react-toastify";
interface LogoutUtilParam {
  msg?: string;
}

export const logout = async ({ msg }: LogoutUtilParam = {}) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/api/user/logout`,
    { credentials: "include" }
  );
  const data = await response.json();
  if (data.success) {
    toast.success(msg || data.message);
  } else {
    toast.error("Logout failed");
  }
  return await data;
};
