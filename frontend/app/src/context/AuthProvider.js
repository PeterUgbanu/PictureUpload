import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || null
  );
  const [userLoggedin, setUserLoggedin] = useState(false);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, userLoggedin, setUserLoggedin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
