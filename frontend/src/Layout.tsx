import { NavBar, Footer } from "./page/index.ts";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
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
