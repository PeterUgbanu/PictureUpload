import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "./Home";

const RequireAuth = () => {
  const { auth } = useAuth();

  return auth ? <Home /> : <Navigate to="/login" />;
};

export default RequireAuth;
