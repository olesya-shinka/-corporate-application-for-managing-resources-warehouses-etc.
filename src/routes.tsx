/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Main from "./pages/main";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { setAuth } from "./store/slice/userSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function AppRoutes(): JSX.Element {
  const dispatch = useDispatch();
  const setCurrentUser = (value: any) => dispatch(setAuth(value));
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuth = () => {
    const token = localStorage.getItem("access");
    if (token) setCurrentUser(token);
    setLoading(false);
    return !!token;
  };

  useEffect(() => {
    isAuth();
  }, []);

  useEffect(() => {
    setIsLoggedIn(isAuth());
  }, [setCurrentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route element={<ProtectedRoute isAuth={() => isLoggedIn} />}>
        <Route path="/" element={<Main />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
