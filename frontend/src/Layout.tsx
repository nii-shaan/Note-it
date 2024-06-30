import { NavBar, Footer } from "./page/index.ts";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "./store/user.slice.ts";
function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    const initializeUser = async () => {
      console.log("test pass");
      const response = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/verifyJWT`,
        { credentials: "include" }
      );
      const data = await response.json();
      // console.log(data)  
      if (data.success) {
        dispatch(
          login({ username: data.data.username, email: data.data.email })
        );
      }
    };
    initializeUser();
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Outlet />
      <ToastContainer />
      <Footer />
    </>
  );
}

export default Layout;
