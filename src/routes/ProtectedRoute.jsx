import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Navigate
        to={`/login?redirectTo=${location.pathname}`}
        state={{
          message: "You must be logged in to access this page.",
        }}
        replace
      />
    );
  }

  return <Outlet context={{ user }} />;
}
