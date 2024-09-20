import { NavBar, Footer } from "./page/index.ts";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./hooks/reduxHooks.ts";
import { login, logout } from "./store/Auth.slice.ts";
import { setNavigate } from "./utils/navigateHelper.ts";
import { fetchEn, logout as myLogout } from "./utils/user.tsx";
function Layout() {
  const navigate = useNavigate();
  //setting global navigate function
  setNavigate(navigate)
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true)


  if (loading) {

  }

  useEffect(() => {
    const fetchY = async () => {
      try {
        const result = await fetchEn("/api/user/verifyUser")

        if (result.isAuthenticated && result.success) {
          dispatch(login())
          setLoading(false)
        } else {
          navigate("/")
          dispatch(logout())
          setLoading(false)
        }
      }
      catch (e) {
        myLogout({ showToast: false })
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
