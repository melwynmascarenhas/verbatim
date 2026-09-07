import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  if (user) {
    const params = new URLSearchParams(location.search);
    const redirectTo = params.get("redirectTo") || "/all-quotes";

    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
}
