import React from "react";
import { useAuth } from "../context/auth/AuthContext";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./UnAuthenticatedRoutes";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <React.Fragment>
      {isAuthenticated ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
    </React.Fragment>
  );
};

export default AppRoutes;
