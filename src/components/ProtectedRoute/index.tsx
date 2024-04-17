import { Navigate, Outlet } from "react-router-dom";
interface ProtectedRouteProps {
  redirectPath?: string;
  isAuth:  boolean;
}
export const ProtectedRoute = ({
  redirectPath = "/login",
  isAuth,
}: ProtectedRouteProps) => {
  console.log(isAuth)
  if (!isAuth) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return <Outlet />;
};
