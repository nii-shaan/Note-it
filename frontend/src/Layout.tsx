import { NavBar, Footer } from "./page/index.ts";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import { fetchUserStatus } from "./hooks/useUser.ts";

function Layout() {
  const { data } = useQuery({ queryKey: ["user"], queryFn: fetchUserStatus });
  console.log(data);
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
