import React, { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({ isLoggedIn: false });

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  return (
    <AuthContext.Provider value={{ isLoggedIn: false }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthContextProvider, useAuth };
