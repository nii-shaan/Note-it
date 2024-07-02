import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/ReduxHooks";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
interface PROTECTEDROUTE {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<PROTECTEDROUTE> = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.user.loggedIn);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, navigate]);

  if (loading) {
    return <Loader />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
