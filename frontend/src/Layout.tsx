import { NavBar, Footer } from "./page/index.ts";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import { fetchUserStatus } from "./hooks/useUser.ts";
import { useAppDispatch } from "./hooks/reduxHooks.ts";
import { login, logout } from "./store/Auth.slice.ts";
import { useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isLoading, isPending, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserStatus,
  });

  useEffect(() => {
    console.log(data);
    if (isLoading || isPending) {
      //TODO
    } else {
      if (isSuccess && data.isAuthenticated) {
        dispatch(login());
      } else {
        navigate("/");
        dispatch(logout());
      }
    }
  }, [navigate, data]);

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
        theme="dark"
      />
      <Footer />
    </>
  );
}

export default Layout;
