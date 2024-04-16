import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Main from "./pages/main";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { setToken } from "./store/slice/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function AppRoutes(): JSX.Element {
  const dispatch = useDispatch();
  const setCurrentUser = (value: any) => dispatch(setToken(value));
  const isAuth = () => {
    const token = localStorage.getItem("access_token");
    if (token) setCurrentUser(token);
    return !!token;
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Routes>
      <Route element={<ProtectedRoute isAuth={isAuth} />}>
        <Route path="/" element={<Main />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
