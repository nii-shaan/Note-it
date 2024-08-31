import { NavBar, Footer } from "./page/index.ts";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch} from "./hooks/reduxHooks.ts";
import { login, logout } from "./store/Auth.slice.ts";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "./utils/navigateHelper.ts";
function Layout() {
	
	console.log("layout mounted")
	const navigate = useNavigate();
	//setting global navigate function
	setNavigate(navigate)

	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState<boolean>(true)


	useEffect(() => {

		const fetchY = async () => {
			const response = await fetch("/api/user/verifyUser")
			const result = await response.json()

			if (result.isAuthenticated) {
				dispatch(login())
				setLoading(false)
			} else {
				navigate("/")
				dispatch(logout())
				setLoading(false)
			}
		}

		fetchY()

	}, [navigate]);

	return (
		<>
			<NavBar />
			<Outlet />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={true}
				newestOnTop={true}
				closeOnClick={true}
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover={false}
				theme="colored"
			/>
			<Footer />
		</>
	);
}

export default Layout;
