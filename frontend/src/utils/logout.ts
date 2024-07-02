import store from "../store/store";
import { logout } from "../store/user.slice";
import { toast } from "react-toastify";
interface LogoutUtilParam {
  showToast?: boolean;
}

const logoutUtil = async ({ showToast = false }: LogoutUtilParam = {}) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/user/logout`,
    { credentials: "include" }
  );
  const data = await response.json();
  if (data.success) {
    store.dispatch(logout());
    if (showToast) {
      toast.success(data.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    }
  } else {
    if (showToast) {
      toast.error("Logout failed", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    }
  }
  return await data;
};
export default logoutUtil;
