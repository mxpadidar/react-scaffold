import useAuth from "@/hooks/use-auth";
import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) navigate(`/login?redirect=${location.pathname}`);
  }, [isAuthenticated, navigate, location]);

  return children;
};

export default ProtectedRoute;
