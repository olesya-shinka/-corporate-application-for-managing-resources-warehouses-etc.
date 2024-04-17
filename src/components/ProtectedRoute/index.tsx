import { Navigate, Outlet } from "react-router-dom";
interface ProtectedRouteProps {
  redirectPath?: string;
  isAuth: boolean;
}
export const ProtectedRoute = ({
  redirectPath = "/login",
  isAuth,
}: ProtectedRouteProps) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return <Outlet />;
};
