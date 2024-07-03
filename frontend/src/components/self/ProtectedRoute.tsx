import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/ReduxHooks";
import { turnOffLoader, turnOnLoader } from "../../store/loader.slice";
import { useNavigate } from "react-router-dom";
interface PROTECTEDROUTE {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<PROTECTEDROUTE> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.user.loggedIn);

  useEffect(() => {
    dispatch(turnOnLoader());
    if (!isLoggedIn) {
      navigate("/");
      dispatch(turnOffLoader());
    } else {
      dispatch(turnOffLoader());
    }
  }, [isLoggedIn, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
