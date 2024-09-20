import { toast } from "react-toastify";
import { logout as logoutState } from "@/store/Auth.slice";
import { store } from "@/store/Store";
import { navigateTo } from "./navigateHelper";



class Response {
  success: boolean
  message: string
  constructor(success: boolean = false, message: string = "Error Occured") {
    this.success = success;
    this.message = message
  }
}


interface LogoutUtilParam {
  msg?: string;
  showToast?: boolean;
  type?: string;
}

export const logout = async ({
  msg,
  showToast = true,
  type = "success"
}: LogoutUtilParam = {}) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/api/user/logout`,
    { credentials: "include" }
  );
  const data = await response.json();
  if (data.success) {
    if (showToast) {
      if (type === "success") {
        toast.success(msg || data.message);
      } else if (type === "error") {
        toast.error(msg || data.message);
      } else {
        toast.success(msg || data.message);

      }
    }
    store.dispatch(logoutState());
    navigateTo("/")
  } else {
    toast.error("Logout failed");
  }
  return await data;
};

export const fetchEn = async (url: string) => {

  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}${url}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const result = await response.json();
    if (result.message === "Access token refreshed" && result.statusCode === 200 && !result.success) {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}${url}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const result1 = await response.json();
      return await result1;

    } else if (result.message === "Refresh token is expired" && result.statusCode === 403) {
      logout({ msg: "Session expired!", showToast: true, type: "error" })
      return new Response()

    } else if (result.message === "Tokens not provided" && !result.success) {
      logout({ showToast: false })

    } else {
      return await result
    }
    return result

  }
  catch (e) {
    return new Response()
  }
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}




