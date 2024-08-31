import { toast } from "react-toastify";
import { logout as logoutState } from "@/store/Auth.slice";
import { store } from "@/store/Store";
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
		`${import.meta.env.VITE_API_ENDPOINT}/user/logout`,
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
//		window.history.pushState({}, '', '/');
	} else {
		toast.error("Logout failed");
	}
	return await data;
};

export const fetchEn = async ({ }) => {


}
